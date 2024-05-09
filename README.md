## NestJS Fundamentals Course Guide

## Router Parameters
- ### normal router
```ts
@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all coffees'
  }
}
```
insomnia request http://localhost:3000/coffees
expect:  This action returns all coffees
- ### parameter router
```ts
@Controller('coffees')
export class CoffeesController {
  @Get('single')
  findSingle() {
    return 'This action returns a single coffee'
  }
}
```
insomnia request http://localhost:3000/coffees/single
expect:  This action returns a single coffees
- ### dynamic parameter router
```ts
@Controller('coffees')
export class CoffeesController {
  @Get(':id')
  findSingle(@Param() params) {
    return `This action returns #${params.id} coffee`
  }
}
```
insomnia request http://localhost:3000/coffees/123
expect:  This action returns a #123 coffees


## Handling Request Body Payload
```ts
@Post()
create(@Body() body) {
  return body;
}
```
insomnia request http://localhost:3000/coffees
request body 
```
{
  "message": "hello world"
}
```
expect:
```
{
  "message": "hello world"
}
```


## Implement Pagination with Query Parameter

```ts
@Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all coffees. Limit: ${limit}, Offset: ${offset}`;
  }
```
insomnia request http://localhost:3000/coffees?limit=20&offset=1
expect:  This action returns all coffees. Limit: 20, Offset: 1


## Basic Service
tip: separate business logic from controllers
```ts
// coffees.controller.ts

export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id)
  }
  ...
}
```

```ts
// coffees.service.ts

export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: '1',
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ]

  findOne(id: string) {
    return this.coffees.find((item) => item.id === id)
  }
}
```


## Friendly Error Message
```ts
export class CoffeesService {
  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }
}
```

## Validate Input Data With DTO(Data Transfer Objects)
#### step 1 
use ValidationPipe
```ts
// main.ts

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidatationPipe())
  await app.listen(3000)
}

bootstrap()
```
#### step 2
`pnpm i class-validator class-transformer`
#### step 3
```ts
// create-coffee-dto.ts

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({each: true}) 
  // "each true" indicates that the expected value is an Array of String's
  readonly flavors: string[];
}
```
### solve redundant code smell
#### step 1
`pnpm i @nestjs/mapped-types`
#### step2
```ts
// update-coffee.dto.ts

// PartialType -> all of the properties set to optional
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
```
