import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Loader2, UtensilsCrossed, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QR_API_URL = import.meta.env.VITE_QR_API_URL || "https://qr.com";

interface CouponResponse {
  message: string;
  data: {
    token: string;
    pinCode: string;
  };
}

const FoodiePage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [pinCode, setPinCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        // Get pinCode from localStorage (set during login)
        const storedPinCode = localStorage.getItem("userPinCode");
        
        if (!storedPinCode) {
          setError("No pin code found. Please login first.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${QR_API_URL}/${storedPinCode}`);
        
        if (!response.ok) {
          throw new Error("Failed to generate coupon");
        }

        const data: CouponResponse = await response.json();
        setToken(data.data.token);
        setPinCode(data.data.pinCode);
      } catch (err) {
        console.error("Error fetching coupon:", err);
        setError(err instanceof Error ? err.message : "Failed to load coupon");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto" />
          <p className="text-muted-foreground">Loading your coupon...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
        <Card className="max-w-sm w-full border-destructive/50">
          <CardContent className="pt-6 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <p className="text-destructive font-medium">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 flex items-center justify-center">
      <Card className="max-w-sm w-full shadow-xl border-orange-200/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center pb-6">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Foodie Coupon</CardTitle>
          <p className="text-white/80 text-sm mt-1">Show this QR at the food stall</p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* QR Code */}
          <div className="flex justify-center">
            <div className="p-4 bg-white rounded-2xl shadow-inner border-2 border-orange-100">
              {token && (
                <QRCodeSVG
                  value={token}
                  size={200}
                  level="H"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor="#1a1a1a"
                />
              )}
            </div>
          </div>

          {/* Pin Code Display */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Your Pin Code</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full">
              <span className="font-mono font-bold text-lg text-orange-700 tracking-widest">
                {pinCode}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 className="font-semibold text-amber-800 text-sm mb-2">How to use:</h4>
            <ol className="text-xs text-amber-700 space-y-1 list-decimal list-inside">
              <li>Show this QR code at the food stall</li>
              <li>Wait for verification</li>
              <li>Enjoy your meal! 🍽️</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodiePage;
