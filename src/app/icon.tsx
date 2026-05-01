import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'

// Image metadata
export const size = {
  width: 256,
  height: 256,
}
export const contentType = 'image/png'

export default async function Icon() {
  const imagePath = join(process.cwd(), 'public/images/luna.webp')
  const imageBuffer = readFileSync(imagePath)
  const imageBase64 = `data:image/webp;base64,${imageBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        <img
          src={imageBase64}
          alt="Luna Icon"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
