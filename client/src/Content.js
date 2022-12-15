import { Button, Label, Table, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Content = () => {
    const [studentData, setStudentData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch("https://server-swart-xi.vercel.app/student")
            .then((res) => res.json())
            .then((data) => {
                setStudentData(data.data);
            });
    }, [refresh]);

    console.log(studentData);

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        // get form data
        const name = form.name.value;
        const id = form.studentId.value;

        const student = { name, id };

        fetch("https://server-swart-xi.vercel.app/student", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(student),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    toast.success("Student data added.");
                    setRefresh(!refresh);
                } else {
                    toast.error("Something Wrong!");
                }
            });
    };
    return (
        <div>
        <div className="max-w-lg mx-auto mt-10  md:mt-14 bg-gray-100 px-12 py-14 rounded-xl divide-y-2">
            <h4 className="text-2xl font-bold mb-5 text-center">
                Please Input Student Data
            </h4>
            <form onSubmit={handleSubmit} className="flex flex-col">
                {/* name */}
                <div className="mt-4">
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Student Name" />
                    </div>
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Jisan Hasan"
                        required
                    />
                </div>
                {/* id */}
                <div className="mt-4">
                    <div className="mb-2 block">
                        <Label htmlFor="studentId" value="Student Id" />
                    </div>
                    <TextInput
                        id="studentId"
                        type="text"
                        name="studentId"
                        placeholder="011183027"
                        required
                    />
                </div>

                <Button className="mt-6" type="submit">
                    Submit
                </Button>
            </form>
        </div>
        {/* table */}
        <div className="mt-10 px-2 max-w-lg mx-auto">
                <Table hoverable={true}>
                    <Table.Head className="text-base text-[#05A3B7]">
                        <Table.HeadCell>Serial</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Id</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {studentData.map((student, i) => (
                            <Table.Row
                                key={student._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {i + 1}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {student.name}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {student.id}
                                </Table.Cell>
                                
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default Content;
