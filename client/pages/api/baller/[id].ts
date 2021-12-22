// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Web3 from "web3";

import seedrandom from 'seedrandom';

import BallersContract from "../../../contracts/Ballers.json";

type Data = {
  name: string,
  description: string,
  image: string,
  attributes: Record<string, any>;
}

function getPosition(r0: number) : string {
  const r0Scaled = Math.floor(r0 * 100);
  const quintile = r0Scaled % 5;

  switch(quintile) {
    case 0:
      return 'Point Guard';
    case 1:
      return 'Shooting Guard';
    case 2:
      return 'Small Forward';
    case 3:
      return 'Power Forward';
    case 4:
      return 'Center';
  }

  return '';
}

function getRating(r0: number) : number {
  const BASE = 60;
  const MAX = 100;

  const MODIFIER = (MAX - BASE) * r0;

  return Math.floor(BASE + MODIFIER);
}

function getAttributes(ballerDNA: string) {
  const generator = seedrandom(ballerDNA);

  return {
    position: getPosition(generator()),
    ratings: {
      shooting: getRating(generator()),
      finishing: getRating(generator()),
      playmaking: getRating(generator()),
      defense: getRating(generator()),
      athleticism: getRating(generator()),
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const provider = new Web3.providers.HttpProvider(
    "http://127.0.0.1:7545"
  );
  const web3 = new Web3(provider);
  
  const instance = new web3.eth.Contract(
    (BallersContract as any).abi,
    '0xdab7F406896631388d5a92954ee126f771ECE293',
  );

  const ballerDNA = await instance.methods.getBallerDNA(req.query.id).call()
  res.status(200).json({
    name: `Baller #${req.query.id}`,
    description: '',
    image: '',
    attributes: getAttributes(ballerDNA)
  })
}
