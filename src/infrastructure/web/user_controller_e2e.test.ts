import express from "express"
import request from "supertest"
import { DataSource } from "typeorm";
import { UserEntity } from "../persistence/entities/user_entity";
import { TypeORMUserRepository } from "../repositories/typeorm_user_repository";
import { UserService } from "../../application/services/user_service";
import { UserController } from "../../infrastructure/web/user_controller";


const app = express();
app.use(express.json());

let data: DataSource;
let userRepository: TypeORMUserRepository;
let userService: UserService
let userController: UserController;


beforeAll(async () => {
  data = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [UserEntity],
    synchronize: true,
    logging: false,
  })

  await data.initialize();

  userRepository = new TypeORMUserRepository(
    data.getRepository(UserEntity)
  );

  userService = new UserService(userRepository);
  userController = new UserController(userService);

  app.post("/users", async (req, res, next) => {
    try {
      userController.createUser(req, res).catch((err) => next(err));
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
})

describe("UserController", () => {

  it("deve criar um usuário com sucesso", async () =>{
    const response = await request(app).post("/users").send({
      name: "Usuário de Teste",
    })

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe("Usuário de Teste");
  })

  it("deve retornar erro com código 400 e mensagem 'O campo nome é obrigatório.' ao enviar um nome vazio",async ()=>{
    const response = await request(app).post("/users").send({})

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "O nome é obrigatório" });
  })

})