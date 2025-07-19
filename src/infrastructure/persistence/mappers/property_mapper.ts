import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";

export class PropertyMapper {
  private constructor() {}

  static toDomain(entity: PropertyEntity): Property {
    return new Property(
      entity.id,
      entity.name,
      entity.description,
      entity.maxGuests,
      Number(entity.basePricePerNight)
    );
  }

  static toPersistence(domain: Property): PropertyEntity {

    if (!domain.getId()) {
      throw new Error("O ID é obrigatório");
    }

    if (!domain.getDescription()) {
      throw new Error("A descrição é obrigatória");
    }

    if (domain.getName().trim() === "") {
      throw new Error("O nome é obrigatório");
    }

    if (domain.getMaxGuests() < 1) {
      throw new Error("O número máximo de hóspedes deve ser maior que zero");
    }

    if(domain.getBasePricePerNight() <= 0) {
      throw new Error("O preço base por noite deve ser maior que zero");
    }

    const entity = new PropertyEntity();
    entity.id = domain.getId();
    entity.name = domain.getName();
    entity.description = domain.getDescription();
    entity.maxGuests = domain.getMaxGuests();
    entity.basePricePerNight = domain.getBasePricePerNight();
    return entity;
  }
}
