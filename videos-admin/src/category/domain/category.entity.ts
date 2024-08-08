import { extend } from "lodash";
import { EntityValidationError } from "../../shared/domain/validators/validation.error";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { CategoryValidatorFactory } from "./category.validator";
import { Entity } from "../../shared/domain/entity";
import { ValueObject } from "../../shared/domain/value-object";
import { CategoryFakeBuilder } from "./category-fake.builder";

export type CategoryConstructorProps = {
    category_id?: Uuid;
    name: string;
    description?: string | null;
    is_active?: boolean;
    created_at?: Date;
};

export type CategoryCreate = {
    name: string;
    description?: string | null;
    is_active?: boolean;

};
export class Category extends Entity{
    category_id: Uuid;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
    
    constructor(pros: CategoryConstructorProps){
        super();
        this.category_id = pros.category_id ?? new Uuid();
        this.name = pros.name;
        this.description = pros.description ?? null;
        this.is_active = pros.is_active ?? true;
        this.created_at = pros.created_at ?? new Date();
    }

    get entity_id() : ValueObject{
        return this.category_id;
    }

    // Factory method
    static create(pros: CategoryConstructorProps): Category {
        const category = new Category(pros);
        Category.validate(category);
        return category;
    }

    static validate(entity: Category) {
        const validator = CategoryValidatorFactory.create();
        const isValid = validator.validate(entity);
        if(!isValid) {
            throw new EntityValidationError(validator.errors);
        }
    }
    
    changeName(name: string): void {
        this.name = name;
        Category.validate(this);
    }

    changeDescription(description: string): void {
        this.description = description;
        Category.validate(this);
    }

    activate() {    
        this.is_active = true;
    }

    deactivate() {
        this.is_active = false;
    }

    static fake(){
        return CategoryFakeBuilder;
    }

    toJSON() {
        return {
            category_id: this.category_id.id,
            name: this.name,
            description: this.description,
            is_active: this.is_active,
            created_at: this.created_at
        };
    }
}