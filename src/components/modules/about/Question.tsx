'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import img1 from "../../../app/assets/download (4).jpeg";

const Question = () => {
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
                Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Left Side - Accordion */}
                <div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="q1">
                            <AccordionTrigger>What is MealBox?</AccordionTrigger>
                            <AccordionContent>
                                MealBox is a food delivery platform that connects customers with meal providers to enjoy fresh, homemade meals at their convenience.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="q2">
                            <AccordionTrigger>How does MealBox work?</AccordionTrigger>
                            <AccordionContent>
                                Customers browse available meals, place an order, and the meal provider prepares and delivers the meal to their doorstep.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="q3">
                            <AccordionTrigger>Can I become a meal provider?</AccordionTrigger>
                            <AccordionContent>
                                Yes! If you are a home cook or professional chef, you can sign up as a provider and start offering meals through MealBox.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="q4">
                            <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                            <AccordionContent>
                                We accept credit/debit cards, PayPal, and other secure online payment methods.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="q5">
                            <AccordionTrigger>How do I contact customer support?</AccordionTrigger>
                            <AccordionContent>
                                You can reach out to our support team via email at support@mealbox.com or through our contact form.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* Right Side - Image */}
                <div className="flex justify-center">
                    <Image width={500} height={500}
                        src={img1} 
                        alt="FAQ Illustration" 
                        className="w-full max-w-sm rounded-xl shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Question;
