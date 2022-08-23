import { UnixTime } from '@l2beat/types'

import { Project } from './types'
import { bridge } from './types/bridge'

export const avalancheBridge: Project = bridge({
  name: 'Avalanche Bridge',
  slug: 'avalanchebridge',
  purpose: 'Native Bridge',
  links: {
    websites: ['https://bridge.avax.network/'],
  },
  bridges: [
    {
      address: '0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0',
      sinceTimestamp: new UnixTime(1634135918),
      tokens: [
        'ETH',
        'USDC',
        'WETH',
        'WBTC',
        'USDT',
        'DAI',
        'LINK',
        'WOO',
        'AAVE',
        //'SWAP',
        'BUSD',
        'SUSHI',
        'SHIB',
        'UNI',
        'GRT',
        'MKR',
      ],
    },
    {
      address: '0x8EB8a3b98659Cce290402893d0123abb75E3ab28',
      sinceTimestamp: new UnixTime(1634135918),
      tokens: [
        'ETH',
        'USDC',
        'WETH',
        'WBTC',
        'USDT',
        'DAI',
        'LINK',
        'WOO',
        'AAVE',
        //'SWAP',
        'BUSD',
        'SUSHI',
        'SHIB',
        'UNI',
        'GRT',
        'MKR',
      ],
    },
  ],
  connections: [],
})
