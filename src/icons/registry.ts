import type { ComponentType } from 'react'
import type { IconName } from '../content/types'
import {
  ServerIcon,
  ComponentIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  CreditCardIcon,
  CoinIcon,
  ChatIcon,
  CheckSquareIcon,
  CompassIcon,
  GlobeIcon,
  CodeIcon,
  TargetIcon,
  SolanaLogo,
} from './index'

export const iconRegistry: Record<IconName, ComponentType> = {
  'server': ServerIcon,
  'component': ComponentIcon,
  'shield-check': ShieldCheckIcon,
  'database': DatabaseIcon,
  'credit-card': CreditCardIcon,
  'coin': CoinIcon,
  'chat': ChatIcon,
  'check-square': CheckSquareIcon,
  'compass': CompassIcon,
  'globe': GlobeIcon,
  'code': CodeIcon,
  'target': TargetIcon,
  'solana-logo': SolanaLogo,
}
