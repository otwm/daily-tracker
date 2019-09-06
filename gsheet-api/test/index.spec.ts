import { google } from 'googleapis'
import * as fs from 'fs'
import * as util from 'util'
import * as readline from 'readline'
import get = Reflect.get;

const clientId = '1008780193446-eanjhch8khf607dbcj4318qcs6sjr6f4.apps.googleusercontent.com'
const secret = 'zzqvhyIV2KO4KP0zZZQ1OlMs'
const redirectUrl = 'urn:ietf:wg:oauth:2.0:oob'

const tokenPath = '../token.json'

const getNewToken = async (oAuth2Client: any) => {
  oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', async (code) => {
    try {
      rl.close()
      const getToken = util.promisify(oAuth2Client.getToken)
      return await getToken(code)
    } catch(error) {
      console.error(error)
    }
  })
}

const getToken = (oAuth2Client: any) => async () => {
  try {
    const readFile = util.promisify(fs.readFile)
    return await readFile(tokenPath)
  } catch {
    await getNewToken(oAuth2Client)
  }
}

describe('gsheet read and write',  async () => {
  test('get auth', async () => {
    const oAuth2Client = new google.auth.OAuth2(
      clientId,
      secret,
      redirectUrl,
    )
    const readFile = util.promisify(fs.readFile)
    const t = await readFile(tokenPath)
    console.log(t)
    // await 1
    // await getToken(oAuth2Client)()
    // const data = await readFile(tokenPath)
    // console.log(data)
    // oAuth2Client.setCredentials(getToken)
  })
})
