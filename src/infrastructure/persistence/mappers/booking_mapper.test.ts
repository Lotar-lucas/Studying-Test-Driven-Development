import { Booking } from '../../../domain/entities/booking'
import { BookingEntity } from '../entities/booking_entity';
import { BookingMapper } from './booking_mapper';


// import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper"
import { Property } from '../../../domain/entities/property';
import { User } from '../../../domain/entities/user';
import { DateRange } from '../../../domain/value_objects/date_range';
import { UserEntity } from '../entities/user_entity';
describe("Booking mapper",() => {

  it("deve converter BookingEntity em Booking corretamente", ()=> {
    const property = new Property("2", "Casa na serra", "Uma bela casa na serra", 3, 250 );
    const user = new User("1", "João")
    const dateRange =  new DateRange(new Date("2023-10-01"), new Date("2023-10-05"));
    const bookingPrimary = new Booking("2", property, user, dateRange, 2);

    const bookingEntity = BookingMapper.toPersistence(bookingPrimary);
    const booking = BookingMapper.toDomain(bookingEntity);

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.getId()).toBe("2");
    expect(booking.getProperty().toString()).toBe(bookingPrimary.getProperty().toString());
    expect(booking.getUser().toString()).toBe(bookingPrimary.getUser().toString());
    expect(booking.getDateRange().toString()).toEqual(bookingPrimary.getDateRange().toString());
    expect(booking.getGuestCount()).toBe(2);
  })

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", ()=> {
    const property = new Property("2", "Casa na serra", "Uma bela casa na serra", 3, 250 );
    const user = new User("1", "João")
    const dateRange =  new DateRange(new Date("2023-10-01"), new Date("2023-10-05"));

    const booking = new Booking("", property, user, dateRange, 2);

    expect(() => BookingMapper.toPersistence(booking)).toThrow("O ID é obrigatório");
  })

  it("deve converter Booking para BookingEntity corretamente ", ()=> {
    const property = new Property("2", "Casa na serra", "Uma bela casa na serra", 3, 250 );
    const user = new User("1", "João")
    const dateRange =  new DateRange(new Date("2023-10-01"), new Date("2023-10-05"));
    const booking = new Booking("3", property, user, dateRange, 2);

    const bookingEntity = BookingMapper.toPersistence(booking);

    expect(bookingEntity).toBeInstanceOf(BookingEntity);
    expect(bookingEntity.id).toBe("3");
    expect(bookingEntity.property).toBeInstanceOf(PropertyEntity);
    expect(bookingEntity.guest).toBeInstanceOf(UserEntity);
    expect(bookingEntity.startDate).toEqual(dateRange.getStartDate());
    expect(bookingEntity.endDate).toEqual(dateRange.getEndDate());
    expect(bookingEntity.guestCount).toBe(2);
  })
})