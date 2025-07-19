import express from "express"
import request from "supertest"
import { DataSource } from "typeorm";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { TypeORMPropertyRepository } from "../repositories/typeorm_property_repository";

import { PropertyService } from "../../application/services/property_service";
import { PropertyController } from "../../infrastructure/web/property_controller";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { UserEntity } from "../persistence/entities/user_entity";


const app = express();
app.use(express.json());

let data: DataSource;
let userRepository: TypeORMPropertyRepository;
let propertyService: PropertyService
let propertyController: PropertyController;
let propertyRepository: TypeORMPropertyRepository;


beforeAll(async () => {
  data = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [PropertyEntity, BookingEntity, UserEntity],
    synchronize: true,
    logging: false,
  })

  await data.initialize();

  propertyRepository = new TypeORMPropertyRepository(
     data.getRepository(PropertyEntity)
   );

  propertyService = new PropertyService(propertyRepository);
  propertyController = new PropertyController(propertyService);

  app.post("/properties", async (req, res, next) => {
    try {
      propertyController.createProperty(req, res).catch((err) => next(err));
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
})

describe("PropertyController", () => {

  it("deve criar uma propriedade com sucesso", async () =>{
    const response = await request(app).post("/properties").send({
      name: "Usuário de Teste",
      description: "Descrição do Usuário de Teste",
      maxGuests: 4,
      basePricePerNight: 100
    })

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body.description).toBe("Descrição do Usuário de Teste");
    expect(response.body.maxGuests).toBe(4);
    expect(response.body.basePricePerNight).toBe(100);
  })

  it("deve retornar erro com código 400 e mensagem 'O nome da propriedade é obrigatório.' ao enviar um nome vazio",async ()=>{
    const response = await request(app).post("/properties").send({
      name: "",
      description: "Descrição do Usuário de Teste",
      maxGuests: 4,
      basePricePerNight: 100
    })

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "O nome da propriedade é obrigatório." });
  })

  it("deve retornar erro com código 400 e mensagem 'A capacidade máxima deve ser maior que zero.' ao enviar maxGuests igual a zero ou negativo",async ()=>{
    const response = await request(app).post("/properties").send({
      name: "usuario de Teste",
      description: "Descrição do Usuário de Teste",
      maxGuests: 0,
      basePricePerNight: 100
    })

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "A capacidade máxima deve ser maior que zero." });
  })

  it("deve retornar erro com código 400 e mensagem 'O preço base por noite é obrigatório.' ao enviar basePricePerNight ausente",async ()=>{
    const response = await request(app).post("/properties").send({
      name: "usuario de Teste",
      description: "Descrição do Usuário de Teste",
      maxGuests: 5
    })

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "O preço base por noite é obrigatório." });
  })

})