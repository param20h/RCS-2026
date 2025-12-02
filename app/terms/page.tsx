import Markdown from '@/components/Markdown'
import axios from 'axios'
import React from 'react'
import { promises as fs } from 'fs'

async function Terms() {
    const file = await fs.readFile(process.cwd() + '/public/terms.txt', 'utf8')
    return (
        <div className="max-w-7xl mx-auto pt-40">
            <Markdown markdown={file} />
        </div>
    )
}

export default Terms
