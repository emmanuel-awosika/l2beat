import { ApiMain } from '@l2beat/common'

import { ReportOutput } from '../../../api/controllers/report/generateReportOutput'

export {}

declare module 'knex/types/tables' {
  interface BlockNumberRow {
    unix_timestamp: string
    block_number: number
  }

  interface PriceRow {
    asset_id: string
    price_usd: number
    unix_timestamp: string
  }

  interface BalanceRow {
    unix_timestamp: string
    holder_address: string
    asset_id: string
    balance: string
  }

  interface ReportRow {
    unix_timestamp: string
    project_id: string
    asset_id: string
    balance: string
    balance_usd: string
    balance_eth: string
    is_daily: boolean
    is_six_hourly: boolean
  }

  interface AggregateReportRow {
    unix_timestamp: string
    project_id: string
    tvl_usd: string
    tvl_eth: string
    is_daily: boolean
    is_six_hourly: boolean
  }

  interface ReportStatusRow {
    config_hash: string
    unix_timestamp: string
  }

  interface BalanceStatusRow {
    config_hash: string
    unix_timestamp: string
  }

  interface CachedDataRow {
    id: number
    unix_timestamp: string
    data: ReportOutput | ApiMain
  }

  interface EventRow {
    block_number: number
    unix_timestamp: string
    project_id: string
    event_name: string
  }

  interface Tables {
    block_numbers: BlockNumberRow
    coingecko_prices: PriceRow
    asset_balances: BalanceRow
    balance_status: BalanceStatusRow
    reports: ReportRow
    aggregate_reports: AggregateReportRow
    report_status: ReportStatusRow
    cached_data: CachedDataRow
    events: EventRow
  }
}
