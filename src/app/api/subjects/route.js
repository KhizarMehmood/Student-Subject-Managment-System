import connectDB from '@/src/utils/connectDB';
import subject from '@/src/models/subject';
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const { userId, name } = await request.json();
    const newSubject = new subject({ userId, name });
    await connectDB();
    await subject.create(newSubject);
    return NextResponse.json(
      {
        message: "User created successfully",
        response: newSubject,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Create a User",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
export async function GET(request) {
  try {
    await connectDB();

    const Subject = await subject.find();

    return NextResponse.json(
      {
        message: "Users retrieved successfully",
        response: Subject,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to retrieve users",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
export async function DELETE(request) {
  try {
    const { id} = await request.json();
    console.log(id);
    await connectDB();

 
    await subject.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "User deleted successfully",
        response: {},
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete user",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
export async function PUT(request) {
  try {
    const {id,userId, name  } = await request.json();
    await connectDB();

    const updatedSubject = await subject.findByIdAndUpdate(id,{ userId, name  }, { new: true });

    return NextResponse.json(
      {
        message: "User updated successfully",
        response: updatedSubject,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update user",
        error,
      },
      {
        status: 500,
      }
    );
  }
}