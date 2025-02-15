import { Logger } from '@l2beat/common'
import { UnixTime } from '@l2beat/types'

import { BaseRepository } from './shared/BaseRepository'
import { Database } from './shared/Database'

export interface ReportStatusRecord {
  configHash: string
  timestamp: UnixTime
}

export class ReportStatusRepository extends BaseRepository {
  constructor(database: Database, logger: Logger) {
    super(database, logger)

    /* eslint-disable @typescript-eslint/unbound-method */

    this.getByConfigHash = this.wrapGet(this.getByConfigHash)
    this.add = this.wrapAdd(this.add)
    this.deleteAll = this.wrapDelete(this.deleteAll)
    this.getBetween = this.wrapGet(this.getBetween)
    this.findLatestTimestamp = this.wrapFind(this.findLatestTimestamp)

    /* eslint-enable @typescript-eslint/unbound-method */
  }

  async getByConfigHash(configHash: string): Promise<UnixTime[]> {
    const knex = await this.knex()
    const rows = await knex('report_status')
      .where({ config_hash: configHash.toString() })
      .select('unix_timestamp')

    return rows.map((r) => new UnixTime(+r.unix_timestamp))
  }

  async add(record: {
    configHash: string
    timestamp: UnixTime
  }): Promise<string> {
    const knex = await this.knex()
    await knex.transaction(async (trx) => {
      await trx('report_status')
        .where({
          unix_timestamp: record.timestamp.toString(),
        })
        .delete()
      await trx('report_status').insert({
        config_hash: record.configHash.toString(),
        unix_timestamp: record.timestamp.toString(),
      })
    })
    return record.configHash
  }

  async deleteAll() {
    const knex = await this.knex()
    return await knex('report_status').delete()
  }

  async getBetween(
    from: UnixTime,
    to: UnixTime,
  ): Promise<ReportStatusRecord[]> {
    const knex = await this.knex()

    const rows = await knex('report_status')
      .where('unix_timestamp', '>=', from.toString())
      .andWhere('unix_timestamp', '<=', to.toString())

    return rows.map((r) => ({
      timestamp: new UnixTime(+r.unix_timestamp),
      configHash: r.config_hash,
    }))
  }

  async findLatestTimestamp(): Promise<UnixTime | undefined> {
    const knex = await this.knex()
    const row = await knex('report_status').max('unix_timestamp').first()
    if (!row) {
      return undefined
    }
    return new UnixTime(+row.max)
  }
}
