
import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper"


describe("Property mapper",() => {
  
    it("deve converter PropertyEntity em Property corretamente", ()=> {
      const propertyPrimary = new Property("2", "Casa na serra", "Uma bela casa na serra", 3, 250 );

      const propertyEntity = PropertyMapper.toPersistence(propertyPrimary);
      const property = PropertyMapper.toDomain(propertyEntity);

      expect(property).toBeInstanceOf(Property);
      expect(property.getId()).toBe("2");
      expect(property.getName()).toBe("Casa na serra");
      expect(property.getDescription()).toBe("Uma bela casa na serra");
      expect(property.getMaxGuests()).toBe(3);
      expect(property.getBasePricePerNight()).toBe(250);
    })

   it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", ()=> {
      const property = new Property("1", "Casa de Campo", "", 5, 150);

      expect(() => PropertyMapper.toPersistence(property)).toThrow("A descrição é obrigatória");
   })

  it("deve converter Property em PropertyEntity corretamente ", ()=> {
    const property = new Property("1", "Casa de praia", "Uma bela casa na praia", 4, 200);

    const propertyEntity = PropertyMapper.toPersistence(property);

    expect(propertyEntity).toBeInstanceOf(PropertyEntity);
    expect(propertyEntity.id).toBe("1");
    expect(propertyEntity.name).toBe("Casa de praia");
    expect(propertyEntity.description).toBe("Uma bela casa na praia");
    expect(propertyEntity.maxGuests).toBe(4);
    expect(propertyEntity.basePricePerNight).toBe(200);
  })

})