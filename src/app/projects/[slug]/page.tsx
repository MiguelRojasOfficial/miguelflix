import React from 'react'
import { client } from '../../../lib/contentful.ts'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

async function getProjectBySlug(slug: string) {
  const res = await client.getEntries({
    content_type: 'project',
    'fields.slug': slug,
  })

  return res.items[0]
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
        Project not found.
      </div>
    )
  }

  const { title, description, githubLink, liveDemoLink, mainImage } = project.fields as any
  const imageUrl = mainImage?.fields?.file?.url ? `https:${mainImage.fields.file.url}` : null

  return (
    <div className="p-8 bg-gray-950 text-white min-h-screen pt-20">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="text-lg text-gray-400 mb-6">
        {documentToReactComponents(description)}
      </div>
      
      {imageUrl && (
        <div className="relative w-full h-80 sm:h-[500px] mb-8 rounded-lg shadow-xl overflow-hidden">
          <Image
            src={`https:${imageUrl}`}
            alt={title as string}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      
      <div className="flex gap-4">
        {githubLink && (
          <a href={githubLink as string} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            View on GitHub
          </a>
        )}
        {liveDemoLink && (
          <a href={liveDemoLink as string} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            View Demo
          </a>
        )}
      </div>
    </div>
  )
}