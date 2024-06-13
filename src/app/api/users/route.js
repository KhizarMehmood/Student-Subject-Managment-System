import connectDB from '@/src/utils/connectDB';
import User from '@/src/models/user';
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const { name, email, age } = await request.json();
    const newUser = new User({ name, email, age });
    await connectDB();
    await User.create(newUser);
    return NextResponse.json(
      {
        message: "User created successfully",
        response: newUser,
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

    const users = await User.find();

    return NextResponse.json(
      {
        message: "Users retrieved successfully",
        response: users,
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

 
    await User.findByIdAndDelete(id);

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
    const {id, name, email, age } = await request.json();
    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });

    return NextResponse.json(
      {
        message: "User updated successfully",
        response: updatedUser,
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