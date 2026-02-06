import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100 p-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="bg-slate-800 p-4 text-white text-center">
          <h1 className="font-bold">Keigo Master Simulator</h1>
          <p className="text-xs opacity-70">Scenario: Emailing the Boss</p>
        </div>

        <div className="h-96 bg-gray-50 p-4 overflow-y-auto space-y-4">
          <div className="flex justify-start">
            <div className="bg-gray-200 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl max-w-[80%]">
              <p className="text-sm text-gray-800">Tanaka-san, did you finish the report?</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl max-w-[80%]">
              <p className="text-sm">Yes, I have completed it.</p>
            </div>
          </div>

           <div className="flex justify-start">
            <div className="bg-gray-200 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl max-w-[80%]">
              <p className="text-sm text-gray-800">Great. Send it to the client.</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <p className="text-sm font-bold text-gray-500 mb-2">Select the correct Humble Form (Kenjougo):</p>
          <div className="space-y-2">
            <button className="w-full text-left p-3 border rounded hover:bg-blue-50 transition border-l-4 border-l-transparent hover:border-l-blue-500">
              A. 了解しました (Ryokai shimashita)
            </button>
            <button className="w-full text-left p-3 border rounded hover:bg-blue-50 transition border-l-4 border-l-transparent hover:border-l-blue-500">
              B. かしこまりました (Kashikomarimashita)
            </button>
            <button className="w-full text-left p-3 border rounded hover:bg-red-50 transition border-l-4 border-l-transparent hover:border-l-red-500">
              C. OKです (OK desu)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
