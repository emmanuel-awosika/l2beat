import { Bytes, EthereumAddress } from '@l2beat/types'
import { providers } from 'ethers'

import { BlockTag, CallParameters } from './types'

export class EthereumClient {
  constructor(private provider: providers.Provider) {}

  async getBlockNumber() {
    const result = await this.provider.getBlockNumber()
    return BigInt(result) // TODO: probably could be a simple number
  }

  async getBlock(blockNumber: number) {
    return await this.provider.getBlock(blockNumber)
  }

  async call(parameters: CallParameters, blockTag: BlockTag) {
    const bytes = await this.provider.call(
      {
        from: parameters.from?.toString(),
        to: parameters.to.toString(),
        gasLimit: parameters.gas,
        gasPrice: parameters.gasPrice,
        value: parameters.value,
        data: parameters.data?.toString(),
      },
      // TODO: probably could be a simple number
      typeof blockTag === 'bigint' ? Number(blockTag) : blockTag,
    )
    return Bytes.fromHex(bytes)
  }

  async getLogsUsingBisection(
    address: EthereumAddress,
    topic: string,
    fromBlock: number,
    toBlock: number,
  ): Promise<providers.Log[]> {
    if (fromBlock === toBlock) {
      return await this.provider.getLogs({
        address: address.toString(),
        topics: [topic],
        fromBlock,
        toBlock,
      })
    }
    try {
      return await this.provider.getLogs({
        address: address.toString(),
        topics: [topic],
        fromBlock,
        toBlock,
      })
    } catch (e) {
      if (
        e instanceof Error &&
        e.message.includes('Log response size exceeded')
      ) {
        const midPoint = fromBlock + Math.floor((toBlock - fromBlock) / 2)
        const [a, b] = await Promise.all([
          this.getLogsUsingBisection(address, topic, fromBlock, midPoint),
          this.getLogsUsingBisection(address, topic, midPoint + 1, toBlock),
        ])
        return a.concat(b)
      } else {
        throw e
      }
    }
  }
}
