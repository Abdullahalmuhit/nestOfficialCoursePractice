import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";

@Entity('coffees')
export class Coffee{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    brand: string;
    @JoinTable()
    @ManyToMany(
        type => Flavor, 
        flavor => flavor.coffees,
        {
            cascade: true
        }
        )

    flavors:Flavor[]
}