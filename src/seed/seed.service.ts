import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { Axios } from 'axios';
import { AxiosAdapter } from '../common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter

  ) {}

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); // Delete all previous records

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    // const insertPromisesArray: Promise<Pokemon>[] = [];
    const pokemonToInsert: CreatePokemonDto[] = [];

    data.results.forEach( ({ name, url }) => {

      const segments  = url.split('/');
      const no:number = +segments[segments.length - 2];  
      // const pokemon = await this.pokemonModel.create({ name, no });
      
      // Primera forma de insertar por lotes
      // insertPromisesArray.push( 
      //   this.pokemonModel.create({ name, no }) 
      // );
      
      pokemonToInsert.push({ name, no }); // Arreglo de pokemon 
    });

    // await Promise.all(insertPromisesArray);
    await this.pokemonModel.insertMany( pokemonToInsert ); // Insertar todos los pokemon en un solo query


    return 'Seed executed successfully';

  }

}
