"use server"
import axios from 'axios';

export async function getPokemons(currentTotal: number, limit?: number) {
  const res = await axios.get(`${process.env.API_URL}/api/pokemons?current=${currentTotal}&limit=${limit}`);
  return res.data;
}