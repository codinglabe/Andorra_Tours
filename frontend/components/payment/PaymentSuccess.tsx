"use client";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  ArrowRight,
  Package,
  CreditCard,
  Calendar,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { NumericFormat } from "react-number-format";
import Fetch from "@/helper/Fetch";
import Link from "next/link";
interface MerchantParameters {
  Ds_Date: string;
  Ds_Hour: string;
  Ds_SecurePayment: string;
  Ds_Amount: string;
  Ds_Currency: string;
  Ds_Order: string;
  Ds_MerchantCode: string;
  Ds_Terminal: string;
  Ds_Response: string;
  Ds_TransactionType: string;
  Ds_MerchantData: string;
  Ds_AuthorisationCode: string;
  Ds_ConsumerLanguage: string;
  [key: string]: string; // Allow additional dynamic properties
}
export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(false);
  const [merchantParameters, setMerchantParameters] =
    useState<MerchantParameters | null>(null);
  const [signature, setSignature] = useState<string>("");
  const [signatureVersion, setSignatureVersion] = useState<string>("");
  const Ds_SignatureVersion = searchParams.get("Ds_SignatureVersion");
  const Ds_MerchantParameters = searchParams.get("Ds_MerchantParameters");
  const Ds_Signature = searchParams.get("Ds_Signature");
  useEffect(() => {
    if (searchParams?.size > 0) {
      if (Ds_SignatureVersion) setSignatureVersion(Ds_SignatureVersion);
      if (Ds_Signature) setSignature(Ds_Signature);

      // Optional: Decode and parse the Ds_MerchantParameters
      if (Ds_MerchantParameters) {
        try {
          const decodedParams = JSON.parse(
            atob(Ds_MerchantParameters)
          ) as MerchantParameters;
          Fetch.post("booking/status/" + decodedParams?.Ds_Order, {
            status: "Paid",
          }).then((res) => {
            // console.log(res)
          });
          setMerchantParameters(decodedParams);
        } catch (error) {
          console.error("Error decoding Ds_MerchantParameters:", error);
        }
      }
    }
  }, [searchParams]);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-400 to-blue-500">
      <div className="w-full max-w-md overflow-hidden rounded-lg shadow-2xl bg-white/90 backdrop-blur-sm">
        <div className="relative p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-green-300 to-blue-300"></div>
          <h2 className="relative z-10 text-3xl font-bold text-center">
            Payment Successful!
          </h2>
        </div>
        <div className="flex flex-col items-center p-6 space-y-6">
          <div className="relative">
            <CheckCircle className="w-24 h-24 text-green-500" />
            <span className="absolute top-0 left-0 w-24 h-24 bg-green-500 rounded-full opacity-25 animate-ping ring-1 ring-green-500"></span>
          </div>
          <p className="text-lg font-bold text-center text-gray-600">
            ¡Gracias por tu reserva!” Tu reserva ha sido confirmada con éxito.
            En breve recibirás un correo con todos los detalles de tu actividad.
          </p>
          <div className="w-full p-6 space-y-4 rounded-lg bg-gradient-to-r from-green-100 to-blue-100">
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              Transaction Details:
            </h3>
            <div className="flex items-center space-x-3">
              <CreditCard className="text-blue-500" />
              <p className="text-gray-700">
                Amount:{" "}
                <NumericFormat
                  value={Number(merchantParameters?.Ds_Amount)}
                  displayType="text"
                  thousandSeparator={","}
                  decimalSeparator="."
                  decimalScale={2}
                  fixedDecimalScale
                  suffix="€"
                />
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Package className="text-blue-500" />
              <p className="text-gray-700">
                Order ID: #{merchantParameters?.Ds_Order}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="text-blue-500" />
              <p className="text-gray-700">
                Date: {decodeURIComponent(merchantParameters?.Ds_Date || "")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-6">
          <Link
            href={"/booking/details/" + merchantParameters?.Ds_Order}
            className="flex items-center px-6 py-3 font-semibold text-white transition-all duration-300 transform rounded-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 hover:scale-105"
          >
            View Order Details
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(50)].map((_, index) => (
        <div
          key={index}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10%",
            animationDelay: `${Math.random() * 5}s`,
            backgroundColor: [
              "#10B981",
              "#3B82F6",
              "#F59E0B",
              "#EF4444",
              "#8B5CF6",
            ][Math.floor(Math.random() * 5)],
            width: "10px",
            height: "10px",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
      ))}
    </div>
  );
}
