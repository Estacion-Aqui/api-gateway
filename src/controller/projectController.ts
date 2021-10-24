import express, { RequestHandler,  Request, Response } from 'express';

      /*const responseData = [
        {
          "id": "1",
          "type": "open",
          "title": "2.5 Km de distancia",
          "amount": "Termomecanica",
          "quantitySpots": "10 vagas disponíves",
          "latitude": -23.736241,
          "longitude": -46.583086
        },
        {
          "id": "2",
          "type": "closed",
          "title": "14.5 Km de distancia",
          "amount": "Termomecanica - Ensino Fundamental",
          "quantitySpots": "Estabelecimento Fechado",
          "latitude": -23.683450,
          "longitude": -46.558028
        },
        {
          "id": "3",
          "type": "empty",
          "title": "3.5 Km de distancia",
          "amount": "Termomecanica - Apresentação da Banda 2021",
          "quantitySpots": "Evento Encerrado",
          "latitude": -23.683450,
          "longitude": -46.558028
        },
        {
          "id": "4",
          "type": "empty",
          "title": "3.5 Km de distancia",
          "amount": "Shopping Metropole",
          "quantitySpots": "Evento Encerrado",
          "latitude": -23.683450,
          "longitude": -46.558028
        },
        {
          "id": "5",
          "type": "empty",
          "title": "3.5 Km de distancia",
          "amount": "Shopping Metropole",
          "quantitySpots": "Evento Encerrado",
          "latitude": -23.683450,
          "longitude": -46.558028
        }
    ];*/

export const updateSpot = async (req: Request, res: Response, reserved: Boolean) => {
  //const client = await pool.connect();
  const body = req.body;

  //const response = await client.query(
  //  'UPDATE Spots SET Reserved = $2 WHERE Id = $1',
  //  [spotId, reserved],
  //);

  return res.status(200).send({ message: 'Vaga atualizada com Sucesso!', body });

}

export const getTravelData = async (req: Request, res: Response) => {
    const responseData = [
        {
            "id": "1",
            "spotId": "A22",
            "estabId": "1",
            "day": "23/09/2021"
          },
          {
            "id": "2",
            "spotId": "A21",
            "estabId": "1",
            "day": "22/09/2021"
          },
          {
            "id": "3",
            "spotId": "A21",
            "estabId": "1",
            "day": "20/09/2021"
          },
          {
            "id": "4",
            "spotId": "A22",
            "estabId": "2",
            "day": "19/09/2021"
          }
    ];

    return res.status(200).json(responseData);
}

export const reserveSpot = async (req: Request, res: Response) => {
    const responseData = {
        "id": "7",
        "spotId": "A22"
    }

    return res.status(200).json(responseData);
}

export const updateData = async (req: Request, res: Response) => {
    const responseData = {
        "id": "10",
        "name" : "Teixeira",
        "car" : "Audi A3",
        "email" : "gabrielteixeir137@gmail.com"
    }

    return res.status(200).json(responseData);
}

export const insertData = async (req: Request, res: Response) => {
    const responseData = {
        "id": "10",
        "name" : "Teixeira",
        "car" : "Audi A3",
        "email" : "gabrielteixeir137@gmail.com"
    }

    return res.status(201).json(responseData);
}

export const checkLogin = async (req: Request, res: Response) => {
    const responseData = {
        "id": "10",
        "name" : "Teixeira",
        "car" : "Audi A3",
        "email" : "gabrielteixeir137@gmail.com"
    }

    return res.status(200).json(responseData);
}

export const confirmSpot = async (req: Request, res: Response) => {
    const responseData = {
        "parkId": "1",
        "spotId": "A22",
        "usId": ""
    }

    return res.status(200).json(responseData);
}

export const cancelSpot = async (req: Request, res: Response) => {
    const responseData = {
        "parkId": "1",
        "spotId": "A22",
        "usId": ""
    }

    return res.status(200).json(responseData);
}

export const checkStatusSpot = async (req: Request, res: Response) => {
    const responseData = {
        "parkId": "1",
        "spotId": "A22",
        "usId": ""
    }

    return res.status(200).json(responseData);
}

export const testApi = async (req: Request, res: Response) => {
  return res.status(200).json({message: 'working API'});
}
