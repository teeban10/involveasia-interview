"use server"
import axios from 'axios';

export async function getPokemons(currentTotal: number, limit?: number) {
  const res = await axios.get(`${process.env.API_URL}/api/pokemons?current=${currentTotal}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  });
  return res.data;
}