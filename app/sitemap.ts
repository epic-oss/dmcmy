import { MetadataRoute } from 'next'
import { getPublishedCompanies } from '@/lib/services/companies'
import { malaysianStates, serviceCategories, destinations, siteConfig } from '@/lib/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  // Fetch all published companies for company pages
  const { companies } = await getPublishedCompanies({ limit: 1000 })

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/listings`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ]

  // State/location pages
  const locationPages: MetadataRoute.Sitemap = malaysianStates.map((state) => ({
    url: `${baseUrl}/locations/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Service category pages
  const servicePages: MetadataRoute.Sitemap = serviceCategories.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Destination pages
  const destinationPages: MetadataRoute.Sitemap = destinations.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Company pages
  const companyPages: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${baseUrl}/companies/${company.slug}`,
    lastModified: new Date(company.updated_at),
    changeFrequency: 'weekly' as const,
    priority: company.is_premium ? 0.7 : 0.6
  }))

  return [
    ...staticPages,
    ...locationPages,
    ...servicePages,
    ...destinationPages,
    ...companyPages
  ]
}
