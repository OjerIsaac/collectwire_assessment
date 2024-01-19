import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function Match<T>(property: keyof T, validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: "Match",
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return value === relatedValue;
                },

                defaultMessage(args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    return `${propertyName} must match ${relatedPropertyName} exactly`;
                },
            },
        });
    };
}
