import { createFileRoute } from '@tanstack/react-router'
import { authenticated } from '@/middlewares/authenticated'

export const Route = createFileRoute('/_authenticated')({
  server: {
    middleware: [authenticated],
  }
})

