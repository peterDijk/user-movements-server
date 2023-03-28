import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Movement {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  userId: string;

  @Column()
  mouseX: number;

  @Column()
  mouseY: number;
}
