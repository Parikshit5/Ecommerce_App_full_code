import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async(req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            return res.status(401).send({message:"Name is requied"});
        }
        const existingCategory=await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'Category Already Exists'
            })
        }
        const category=await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:"New category created"
        })
    } catch (error) {
        console.log
        res.status(500).send({
            success:false,
            error,
            message:'Error in Category'
        })
    }
}

export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        if(!name){
            return res.status(401).send({message:"Name is requied"});
        }
        
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})

        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            category,
            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating category'
        })
    }
} 

//get all category
export const categoryController=async(req,res)=>{
    try {
        const category=await categoryModel.find({})
        res.status(200).send({
           success:true,
           messsage:"All Categories List", 
           category,
        })
        
    } catch (error) {
       console.log(error)
       res.status(500).send({
        success:false,
        error,
        message:"Error while getting all categories"
       }) 
    }
}

//get single category

export const singleCategoryController=async(req,res)=>{
    try {    
        const category=await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            messsage:"Get Single Category", 
            category,
         })
    } catch (error) {
        console.log(error)
        res.status(500).send({
         success:false,
         error,
         message:"Error while getting Single category"
        })   
    }
}

//delete category

export const deleteCategoryController=async(req,res)=>{
    try {
        const{id}=req.params
       await categoryModel.findByIdAndDelete(id) 
       res.status(200).send({
        success:true,
        message:"Category Deleted successfully"
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while deleting category"
        })
    }
}