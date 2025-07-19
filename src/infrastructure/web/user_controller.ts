import { UserService } from "../../application/services/user_service";
import { Request, Response } from "express";
import { CreateUserDTO } from "./../../application/dtos/create_user_dto";


export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService
  }

  async createUser(req: Request, res: Response):Promise<Response>{
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "O nome é obrigatório" });
      }

      const dto: CreateUserDTO = { name }
      const user = await this.userService.createUser(dto);

      return res.status(201).json({
        id: user.getId(),
        name: user.getName(),
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

}
