- ## [Create new migration file after changing](#create-new-migration-file-after-changing)
- ## [Introduction to microservice , Api gateway and redis](#introduction-to-micoservice--api-gateway-and-redis)
  - ## [Monolithic and Microservices](#monolithic-and-microservices)
  - ## [Redis](#redis-1)
- ## [create a model for academicSemester , academicFaculty , AcademicDepartment , Faculty , Student](#create-a-model-for-academicsemester--academicfaculty--academicdepartment--faculty--student-1)
- ## [improved functionality with catchAsync and validation for academic semester](#improved-functionality-with-catchasync-and-validation-for-academic-semester-1)
  - ## [improve validation for academicSemester](#improve-validation-for-academicsemester-1)
- ## [Retrieving AcademicSemester data with integration of pagination Techniques](#retrieving-academicsemester-data-with-integration-of-pagination-techniques-1)
  - ## [Retriving AcademicSemester data](#retriving-academicsemester-data-1)
  - ## [integration with pagination](#integration-with-pagination-1)

- [Create folder for academic Semester](#create-folder-for-academic-semester)



# University Management Core Service


This guide will walk you through the process of setting up the University Management Core Service Starter project. By following these steps, you will clone the project, install dependencies, and configure Prisma for database management. Let's get started!


## Installation Steps
### Follow these steps to clone and set up starter project:

1. `Clone the project:` Open your terminal or command prompt and run the following command to clone the project repository:
2. **এটা `private repository` এটা clone করতে হবে । এখানে এই প্রজেক্টের stater project দেয়া আছে ।**

```bash
git clone https://github.com/AriFullah3202/university-core-stater.git
```

2. `Navigate into the project directory:` Use the cd command to navigate into the project directory:

```bash
cd university-management-core-service
```

3. `Install project dependencies:` Next, install the project dependencies by running the following command:

```bash
yarn install
```

4. Configure Prisma and the database connection:

- Add Prisma as a development dependency by running the following command:
- **এটা ডিপেনডেন্সি এড হবে** 
```bash
yarn add prisma --save-dev
```

- **নিচের কমান্ডটা একটা `prisma` ফোল্ডার ক্রিয়েটা হবে । তারপর `prisma.schema` ফাই্ল ক্রিয়েট হবে । তারপর `.env` ফাইল ক্রিয়েট হবে ।**
- Set up your Prisma project by creating the Prisma schema file using the following command:

```bash
npx prisma init
```

- Open the prisma/schema.prisma file and configure your database connection details.

```bash
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
- **উপরের কমান্ড দিলে একটা `.env` ফাইল ক্রিয়েট হবে । তারপর ওই ফাইল খুলে পাসওয়র্ড ও ইউজার নেম দিয়ে সেইভ করতে হবে ।**


- Create a .env file in the project root directory and set the DATABASE_URL environment variable. Replace the placeholders with your database connection details:
```bash
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:root@localhost:5432/core-service?schema=public"
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
```

5. Creating the database schema
6. Migrate the database schema: Use the following command to create and apply the initial database schema:

- **মডেল এবং `schema` ক্রিয়েট করার পর নিচের কমান্ড দিতে হবে । অথার্ৎ যদি আমরা `schema.prisma` ফাইল চেন্জ করতে চাই তাহলে চেন্জ করে `migrate` করতে হবে ।**

- **আরেকটা গুরুত্বপূর্ণ বিষয় হলো এটা ডাটাবেজের সাথে কানেক্ট করে ।**


```bash
npx prisma migrate dev --name init
```
This command creates a new migration file based on your schema changes and applies it to your database.


- **ডাটাবেজের কুয়েরি এবং `prisma` এর কুয়েরি ব্যবহার করতে নিচের কমান্ডটা দিতে হবে ।**

6. `Install Prisma Client:` Install the Prisma Client library by running the following command:

```bash
yarn add @prisma/client
```

This command installs the Prisma Client, which provides an interface to interact with your database.

That's it! You have successfully set up the University Management Core Service Starter project. You can now start exploring and working with the codebase. Refer to the project documentation or README for further instructions on how to run and use the core service.

Happy coding!

## Introduction to micoservice , api gateway and redis
## Monolithic and Microservices
* `monolithic` এখানে একটা `client` থাকবে , `server` থাকবে , এবং ডাটাবেজ থাকবে । মানে এখানে একটা ডাটাবেজ থাকবে , একটা সাভার্র থাকবে ।
* আর `microservice` এখানে যত ইচ্ছা `ডাটাবেজ` , যত ইচ্ছা `সাভার্র` রাখা যায় । আর ক্লায়েন্টর রিকোয়েস্ট হ্যন্ডেল করতে এবং `সাভার্র` হ্যান্ডেল করতে `Api gateway` ব্যবহার করা হয় । **এটার সুবিধা আলাদা আলাদা টিম আলাদা আলাদা `deploy` করা যায় ।** 
* `api gateway` যা ক্লায়েন্ট এবং সাভার্রের মাঝামাঝি অবস্থান করবে ।
## Redis
Redis হচ্ছে Remote Dictionary Server এটি ওপেন সোর্স

এটি দিয়ে `sub messing` , `caching` , `rate limiting` , `session stoarage` করতে পারি ।

* alternative of redis
  * Memcached
  * Apache Kafka
  * Couchbase
  * Hazelcast
  **উপরের সবগুলো রেডিসের বদলে ইউজ করে । তরে আমরা `redis` ব্যবহার করব ।**





## Designing Academic semester , Academic department , academic faculty student faculty schemas

* in prisma.schema 
### create a model for academicSemester , academicFaculty , AcademicDepartment , Faculty , Student

```prisma
model AcademicSemester {
  id         String    @id @default(uuid())
  year       Int
  title      String
  code       String
  startMonth String
  endMonth   String
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
  students   Student[]

  @@map("academic_semesters")
}

model AcademicFaculty {
  id         String      @id @default(uuid())
  title      String
  createdAt  String
  updatedAt  String
  AcademicDepartments AcademicDepartment[]
  students Student[]
  faculties Faculty[]
  @@map("academic_faculty")
}

model AcademicDepartment {
   id String @id @default(uuid())
   title String 
   createdAt String
   updatedAt String 
   academicFacultyId String
   academicFaculty AcademicFaculty @relation(fields: [academicFacultyId], references:[id])
   students Student[]
   faculties Faculty[]
   @@map("academic_department")
}

model Student {
   id String @id @default(uuid())
   studentId String 
   firstName String
   lastName String
   middleName String
   profileImage String
   email String
   contactNo Int
   gender String
   bloodGroup String

   academicSemesterId String
   academicSemester AcademicSemester @relation(fields: [academicSemesterId], references : [id])


   academicDepartmentId String
   academicDepartment AcademicDepartment @relation(fields : [academicDepartmentId] ,references : [id])

   academicFacultyId String
   academicFaculty AcademicFaculty @relation(fields : [academicFacultyId] , references : [id])

  createdAt String
   updatedAt String
   
   @@map("students")
}

model Faculty {
   id String @id @default(uuid())
   facultyId String 
   firstName String
   lastName String
   middleName String
   profileImage String
   email String
   contactNo Int
   gender String
   bloodGroup String
   designation String

   academicDepartment AcademicDepartment @relation(fields : [academicDepartmentId], references : [id])
   academicDepartmentId String

   academicFaculty AcademicFaculty @relation(fields : [academicFacultyId] ,references : [id])
   academicFacultyId String
    createdAt String
   updatedAt String 
   @@map("faculties")
}

```
## Create new migration file after changing
* নিচের কমান্ড দিলে `schema` , `model` যা যা পরিবর্তন করলাম সব ডাটা ডাটাবেজে পরিবর্তন হবে ।

```bash
npx prisma migrate dev --name init
```
## Create folder for academic Semester
* src
  * app
    * modules
      * academicSemester
        * academicSemester.controller.ts
        * academicSemester.services.ts
        * academicSemester.routes.ts
        * academicSemester.validation.ts
    * routes
      * index.ts
* in academicSemester.controller.ts

```js
const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: 'academic semester created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const AcademicSemesterController = { createSemester };
```
## improved functionality with catchAsync and validation for academic semester

#### আগে উপরের মতে ছিল এখন আমরা optimization করে `try-catch` handle করেছি ।

```js
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.insertIntoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester created',
    data: result,
  });
});

export const AcademicSemesterController = {
  insertIntoDB,
};

```
* src
  * shared
    * catchasync.ts

* **আমাদের `user.controller.ts` and `academicSemister.controller.ts` এর মধ্যে `try-catch` ব্যবহার করেছি ।** 
* **এইটা অপটিমাইজ করতে হবে ।**
* **এজন্য একটা ‌`higher order function` ক্রিয়েট করতে হবে যেটা সবাই ব্যবহার করতে পারি ।**
* **এভাবে সব `controller` এখানে প্রবেশ করবে ।**

```js
import { NextFunction, Request, RequestHandler, Response } from 'express';
const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
export default catchAsync;
```

* in academicSemester.service.ts

```js
import { AcademicSemester, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertIntoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};

export const AcademicSemesterService = { insertIntoDB };

```
* in academicSemester.routes.ts
### improve validation for academicSemester

**নিচের `post routes` ভ্যালিডেট করা হয়েছে ।**
* **এই ভ্যালিডেট করার জন্য দুইটা জিনিস করা হয়েছে ।**
* `validateRequest` নামে middleware ক্রিয়েট করা 
* `zod` ব্যবহার করা । যেটি `academic semester` জন্য `validation` চেক করবে ।

```js
import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();
router.post('/',
 validateRequest(AcademicSemesterValidation.create),
 AcademicSemesterController.insertIntoDB);
export const AcademicSemesterRoutes = router;

```
* এটা `zodValidation` করার middleware. যা নিচের zod validation চেক করবে ।

* middleware
  * validateRequest.ts

```js
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
```


* academic-semesters.validation.ts
```js
import { z } from 'zod';

const create = z.object({
  body: z.object({
    year: z.number({
      required_error: 'year is required',
    }),
    title: z.string({
      required_error: 'title is required',
    }),
    code: z.string({
      required_error: 'code is required',
    }),
    startMonth: z.string({
      required_error: 'startMonth is required',
    }),
    endMonth: z.string({
      required_error: 'endMonth is required',
    }),
  }),
});
export const AcademicSemesterValidation = {
  create,
};
```
## Retrieving AcademicSemester data with integration of pagination Techniques
## Retriving AcademicSemester data
* in AcademicSemster.controller.ts

* **এখানে `meta` , নামে এক্সট্রা ডাটা পাচ্ছি যেটাতে `total` , `page`, `limit` , পাচ্ছি ।**

```js
const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getAllFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
```
* in AcademicSemester.service.ts
* **এখানে রিটার্ন টাইপ `IgenericResponse` এর ভিতরে একটা `generic` টাইপ**
যেমন : **এখানে `IgenericResponse` একটা টাইপ নিচ্ছে ।**
* src
  * interface
    * common.ts
```ts
export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
```
* **যেহেতু অনেকগুলো ডাটা রিটার্ন করবো তাই [] দিয়েছি ।**
```js
const getAllFromDb = async (): Promise<
  IGenericResponse<AcademicSemester[]>
> => {
  const result = await prisma.academicSemester.findMany();
  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page: 1,
      limit: 10,
    },
    data: result,
  };
};
```
## integration with pagination



