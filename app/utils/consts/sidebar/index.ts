import PersonsIcon from '@gravity-ui/icons/svgs/persons.svg'
import PersonGearIcon from '@gravity-ui/icons/svgs/persons-lock.svg'
import Layers3DiagonalIcon from '@gravity-ui/icons/svgs/layers-3-diagonal.svg'

export const sidebarItems: SidebarItem[] = [
  {
    to: '/assemblies',
    title: 'Все сборки',
    icon: Layers3DiagonalIcon,
    selectedRoutesNames: ['assemblies'],
  },
  {
    to: '/assemblies/public',
    title: 'Публичная сборки',
    icon: PersonsIcon,
    selectedRoutesPaths: ['/assemblies/public'],
  },
  {
    to: '/assemblies/private',
    title: 'Приватные сборки',
    icon: PersonGearIcon,
    selectedRoutesPaths: ['/assemblies/private'],
  },
]
