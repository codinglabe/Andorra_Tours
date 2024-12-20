'use client'
import { useState, useEffect } from 'react'
import { XCircle, RefreshCcw, ArrowLeft, AlertTriangle, ShieldOff } from 'lucide-react'
import { useSearchParams } from 'next/navigation';
import { NumericFormat } from 'react-number-format';
import Fetch from '@/helper/Fetch';
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
export default function PaymentFailure() {
  const [shake, setShake] = useState(false)
  const searchParams = useSearchParams()
  const [showConfetti, setShowConfetti] = useState(false)
  const [merchantParameters, setMerchantParameters] = useState<MerchantParameters | null>(null);
  const [signature, setSignature] = useState<string>('');
  const [signatureVersion, setSignatureVersion] = useState<string>('');
  const Ds_SignatureVersion = searchParams.get("Ds_SignatureVersion")
  const Ds_MerchantParameters = searchParams.get("Ds_MerchantParameters")
  const Ds_Signature = searchParams.get("Ds_Signature")
  useEffect(() => {
    if (searchParams?.size > 0) {
      if (Ds_SignatureVersion) setSignatureVersion(Ds_SignatureVersion);
      if (Ds_Signature) setSignature(Ds_Signature);

      // Optional: Decode and parse the Ds_MerchantParameters
      if (Ds_MerchantParameters) {
        try {
          const decodedParams = JSON.parse(atob(Ds_MerchantParameters)) as MerchantParameters;
          Fetch.post("booking/status/"+decodedParams?.Ds_Order,{status:"Cancelled"}).then((res)=>{
              // console.log(res)
          })
          setMerchantParameters(decodedParams);
        } catch (error) {
          console.error('Error decoding Ds_MerchantParameters:', error);
        }
      }
    }
  }, [searchParams]);
  useEffect(() => {
    setShake(true)
    const timer = setTimeout(() => setShake(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 to-purple-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden">
        <div className="relative overflow-hidden p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-purple-300 opacity-50"></div>
          <h2 className="relative z-10 text-3xl font-bold text-center text-gray-800">
            Payment Failed
          </h2>
        </div>
        <div className="flex flex-col items-center space-y-6 p-6">
          <div className={`relative transition-transform ${shake ? 'animate-shake' : ''}`}>
            <XCircle className="w-24 h-24 text-red-500" />
            <AlertTriangle className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-600 text-center text-lg">
            We're sorry, but your payment could not be processed at this time.
          </p>
          <div className="bg-gradient-to-r from-red-100 to-purple-100 p-6 rounded-lg w-full space-y-4">
            <h3 className="text-gray-800 font-semibold text-xl mb-2">Error Details:</h3>
            <div className="flex items-center space-x-3">
              <ShieldOff className="text-red-500" />
              <p className="text-gray-700">Error Code: PAY_001</p>
            </div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="text-yellow-500" />
              <p className="text-gray-700">Message: Invalid card information</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4 p-6">
          <button className="bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center">
            <RefreshCcw className="mr-2 h-5 w-5" />
            Try Again
          </button>
          <button className="border-2 border-purple-500 text-purple-500 hover:bg-purple-50 font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}