import SalaryModel from "../models/SalaryModel.js";


//localhost:5000/salary/
export const createSalary = async (req, res) => {
    const { userId, basic, attendanceAllowance, fuelAllowance, overtime } = req.body;

    if (!userId || !basic || !attendanceAllowance || !fuelAllowance || !overtime) {
        return res.status(400).json({ error: "All fields are required" });
    }


    const totalSalary = calculateTotalSalary(basic, attendanceAllowance, fuelAllowance, overtime);

    try {
        const newSalary = await SalaryModel.create({
            userId,
            basic,
            attendanceAllowance,
            fuelAllowance,
            overtime,
            totalSalary
        });

        return res.status(201).json(newSalary);
    } catch (error) {
        console.error("Error creating salary:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//localhost:5000/salary/661e70d07b572a6e4c71b4ba
export const updateSalary = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!id) {
            throw Error("Id can't be empty");
        }

        // Calculate totalSalary if any relevant fields are being updated
        if (data.basic || data.attendanceAllowance || data.fuelAllowance || data.overtime) {
            data.totalSalary = calculateTotalSalary(data.basic, data.attendanceAllowance, data.fuelAllowance, data.overtime);
        }

        const updatedSalary = await SalaryModel.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({ message: 'Salary Updated Successfully', item: updatedSalary });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Utility function to calculate totalSalary
function calculateTotalSalary(basic, attendanceAllowance, fuelAllowance, overtime) {
    
    const basicInt = parseInt(basic);
    const attendanceAllowanceInt = parseInt(attendanceAllowance);
    const fuelAllowanceInt = parseInt(fuelAllowance);
    const overtimeInt = parseInt(overtime);

    return basicInt + attendanceAllowanceInt + fuelAllowanceInt + overtimeInt;
}


//localhost:5000/salary/
export const getAllSalaries = async (req, res) => {
    try {
        const salaries = await SalaryModel.find()
        .populate('userId');
        res.status(200).json(salaries);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


//localhost:5000/salary/661e70d07b572a6e4c71b4ba
export const getOneSalary = async (req, res) => {
    try {
        const id = req.params.id;
        const salary = await SalaryModel.findById(id);
        res.status(200).json(salary);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


//localhost:5000/salary/661e70d07b572a6e4c71b4ba
export const deleteSalary = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            throw Error("Id can't be empty");
        }
        const deletedSalary = await SalaryModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Salary Deleted Successfully', item: deletedSalary });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};