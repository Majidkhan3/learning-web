import { NextResponse } from 'next/server'
import pdfParse from 'pdf-parse'

export async function POST(req) {
  const formData = await req.formData()
  const file = formData.get('file')

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const data = await pdfParse(buffer)
    const lines = data.text
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line, idx) => ({
        id: idx + 1,
        dialogue: line.trim(),
      }))

    return NextResponse.json({ dialogues: lines })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 })
  }
}
