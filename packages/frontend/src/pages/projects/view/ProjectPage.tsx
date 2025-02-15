import React from 'react'

import {
  Chart,
  ChartProps,
  Footer,
  Header,
  HeaderProps,
  Navbar,
} from '../../../components'
import { Page } from '../../../components/Page'
import { ProjectDetails, ProjectDetailsProps } from './ProjectDetails'

export interface ProjectPageProps {
  header: HeaderProps
  chart: ChartProps
  projectDetails: ProjectDetailsProps
}

export function ProjectPage(props: ProjectPageProps) {
  return (
    <Page>
      <Navbar />
      <Header {...props.header} />
      <Chart {...props.chart} />
      <ProjectDetails {...props.projectDetails} />
      <Footer />
    </Page>
  )
}
