import type { NextApiRequest, NextApiResponse } from 'next'

const getHandler = async (
  request: NextApiRequest,
  response: NextApiResponse,
) => {
  return response.status(200).send({ message: 'Hello World' })
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  switch (request.method) {
    case 'GET':
      await getHandler(request, response)

      break
    default:
      response.setHeader('Allow', ['GET'])
      response.status(405).end(`Method ${request.method} Not Allowed`)
  }
}
