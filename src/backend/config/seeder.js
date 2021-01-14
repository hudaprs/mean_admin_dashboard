const datas = [
  {
    name: 'Michelle Hicks'
  },
  {
    name: 'Hodges Alvarado'
  },
  {
    name: 'Nellie Baxter'
  },
  {
    name: 'Osborn Osborne'
  },
  {
    name: 'Robbins Hopper'
  },
  {
    name: 'Consuelo Ramos'
  },
  {
    name: 'Pacheco Peck'
  },
  {
    name: 'Mara Swanson'
  },
  {
    name: 'Finley Hopkins'
  },
  {
    name: 'Lara Rasmussen'
  },
  {
    name: 'Lea Marks'
  },
  {
    name: 'Mollie Serrano'
  },
  {
    name: 'Robles Hall'
  },
  {
    name: 'Lena Walls'
  },
  {
    name: 'Cortez Clark'
  },
  {
    name: 'Miranda Lucas'
  },
  {
    name: 'Esperanza Wagner'
  },
  {
    name: 'Muriel Berg'
  },
  {
    name: 'Ruthie Black'
  },
  {
    name: 'Serena Dyer'
  },
  {
    name: 'Rich Dalton'
  },
  {
    name: 'Berg Hoover'
  },
  {
    name: 'Margaret Powers'
  },
  {
    name: 'Juliet Stephens'
  },
  {
    name: 'Melanie Santana'
  },
  {
    name: 'Gilmore Johnston'
  },
  {
    name: 'Gale Ayers'
  },
  {
    name: 'England Ashley'
  },
  {
    name: 'Weaver Knight'
  },
  {
    name: 'Winifred Kemp'
  },
  {
    name: 'Rachael Casey'
  },
  {
    name: 'Wiley Sullivan'
  },
  {
    name: 'Klein Levine'
  },
  {
    name: 'Powers Nash'
  },
  {
    name: 'Yolanda Brennan'
  },
  {
    name: 'Morse Hooper'
  },
  {
    name: 'Evans Williamson'
  },
  {
    name: 'Guerrero Villarreal'
  },
  {
    name: 'Monica Hess'
  },
  {
    name: 'Rowe Reid'
  },
  {
    name: 'Curtis White'
  },
  {
    name: 'Janna Mcdonald'
  },
  {
    name: 'Magdalena Jenkins'
  },
  {
    name: 'Margo Whitaker'
  },
  {
    name: 'Reynolds Arnold'
  },
  {
    name: 'Bernard Burt'
  },
  {
    name: 'Olive Jimenez'
  },
  {
    name: 'Navarro Woodward'
  },
  {
    name: 'Brianna Hendrix'
  },
  {
    name: 'Trudy Cash'
  },
  {
    name: 'Mooney Craig'
  },
  {
    name: 'Cassie Heath'
  },
  {
    name: 'Hull Kennedy'
  },
  {
    name: 'Larsen Conrad'
  },
  {
    name: 'Salinas Warner'
  },
  {
    name: 'Marks Mcgowan'
  },
  {
    name: 'Sanchez Gould'
  },
  {
    name: 'Lorene Owen'
  },
  {
    name: 'Herman Obrien'
  },
  {
    name: 'Jacqueline Buck'
  },
  {
    name: 'Wagner Terrell'
  },
  {
    name: 'Morrison Ross'
  },
  {
    name: 'Hebert Hays'
  },
  {
    name: 'Albert Montgomery'
  },
  {
    name: 'Roy Morton'
  },
  {
    name: 'Mcintyre Peters'
  },
  {
    name: 'Bolton Woodard'
  },
  {
    name: 'Paige Kline'
  },
  {
    name: 'Amber Massey'
  },
  {
    name: 'Elsa Emerson'
  },
  {
    name: 'Phillips Hutchinson'
  },
  {
    name: 'Shaw Summers'
  },
  {
    name: 'Cherie Greer'
  },
  {
    name: 'Carmela Steele'
  },
  {
    name: 'Queen Pacheco'
  },
  {
    name: 'Marcie Rogers'
  },
  {
    name: 'Kelly Conner'
  },
  {
    name: 'Anna Lancaster'
  },
  {
    name: 'Kathleen Acevedo'
  },
  {
    name: 'Claire Boyer'
  },
  {
    name: 'Marcia Lamb'
  },
  {
    name: 'Merle Carver'
  },
  {
    name: 'Adriana Hoffman'
  },
  {
    name: 'Rena Calhoun'
  },
  {
    name: 'Jaime Ballard'
  },
  {
    name: 'Alvarez Fleming'
  },
  {
    name: 'Kirk Rodgers'
  },
  {
    name: 'Burks Sargent'
  },
  {
    name: 'Kasey Henry'
  },
  {
    name: 'Kelli Shaffer'
  },
  {
    name: 'Hunter Romero'
  },
  {
    name: 'Marjorie Perkins'
  },
  {
    name: 'Pickett Mercado'
  },
  {
    name: 'Blanche Johnson'
  },
  {
    name: 'Langley Blackburn'
  },
  {
    name: 'Antoinette Reilly'
  },
  {
    name: 'Glenna Ochoa'
  },
  {
    name: 'Pamela Randolph'
  },
  {
    name: 'Alvarado Hewitt'
  },
  {
    name: 'Estrada Petty'
  }
]

import mongooseConnect from './database'
import { User } from '../app/models'

mongooseConnect()

/**
 * @description   Script
 */
if (process.argv[2] === '-d') {
  User.deleteMany()
    .then(_ => console.log('Data deleted'))
    .catch(err => console.error(err))
} else {
  // Delete and insert
  User.deleteMany()
    .then(_ => {
      console.log('Data deleted')
      // Seed data
      User.insertMany(datas)
        .then(_ => console.log('Data inserted'))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}
