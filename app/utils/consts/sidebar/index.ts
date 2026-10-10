import PersonsIcon from '@gravity-ui/icons/svgs/persons.svg'
import PersonGearIcon from '@gravity-ui/icons/svgs/persons-lock.svg'
import Layers3DiagonalIcon from '@gravity-ui/icons/svgs/layers-3-diagonal.svg'
import SquarePlusIcon from '@gravity-ui/icons/svgs/square-plus.svg'
import ArchiveIcon from '@gravity-ui/icons/svgs/archive.svg'

export const sidebarItems: SidebarItem[] = [
  {
    to: '/assemblies',
    title: 'Текущие сборки',
    icon: Layers3DiagonalIcon,
    selectedRoutesNames: ['assemblies'],
  },
  {
    to: '/assemblies/public',
    title: 'Публичные сборки',
    icon: PersonsIcon,
    selectedRoutesPaths: ['/assemblies/public'],
  },
  {
    to: '/assemblies/private',
    title: 'Приватные сборки',
    icon: PersonGearIcon,
    selectedRoutesPaths: ['/assemblies/private'],
  },
  {
    to: '/assemblies/archive',
    title: 'Мои архивные сборки',
    icon: ArchiveIcon,
    selectedRoutesPaths: ['/assemblies/archive'],
  },
  {
    to: '/assembly/new',
    title: 'Новая сборка',
    icon: SquarePlusIcon,
    selectedRoutesNames: ['assembly-new'],
  },
]
