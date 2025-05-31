"use client";

import React from 'react';

const ResolutionProofDiagram = () => {
    return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Resolution Proof: &quot;The head of a horse is the head of an animal&quot;
            </h1>

            <div className="relative">
                {/* SVG for connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    {/* Lines from premise and negated conclusion to clausal form */}
                    <line x1="20%" y1="12%" x2="50%" y2="25%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="80%" y1="12%" x2="50%" y2="25%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />

                    {/* Lines from clausal form to individual clauses */}
                    <line x1="50%" y1="30%" x2="15%" y2="45%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="50%" y1="30%" x2="38%" y2="45%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="50%" y1="30%" x2="62%" y2="45%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="50%" y1="30%" x2="85%" y2="45%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />

                    {/* Lines to resolution steps */}
                    <line x1="15%" y1="50%" x2="25%" y2="65%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="38%" y1="50%" x2="25%" y2="65%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />

                    <line x1="25%" y1="75%" x2="75%" y2="85%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="62%" y1="50%" x2="75%" y2="85%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="85%" y1="50%" x2="75%" y2="85%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />

                    {/* Final resolution lines */}
                    <line x1="75%" y1="95%" x2="50%" y2="105%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="50%" y1="115%" x2="50%" y2="125%" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />

                    {/* Arrow marker definition */}
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
                        </marker>
                    </defs>
                </svg>

                {/* Content boxes */}
                <div className="relative" style={{ zIndex: 2 }}>
                    {/* Starting premises */}
                    <div className="flex justify-between mb-16">
                        <div className="w-2/5 bg-blue-100 border-2 border-blue-300 rounded-lg p-4 shadow-md">
                            <h3 className="font-bold text-blue-800 mb-2">Premise</h3>
                            <p className="text-sm">∀x (Horse(x) → Animal(x))</p>
                            <p className="text-xs text-gray-600 mt-1">Clause 1: ¬Horse(x) ∨ Animal(x)</p>
                        </div>

                        <div className="w-2/5 bg-orange-100 border-2 border-orange-300 rounded-lg p-4 shadow-md">
                            <h3 className="font-bold text-orange-800 mb-2">Negated Conclusion</h3>
                            <p className="text-sm">∃y,x (Horse(y) ∧ Head(x,y) ∧</p>
                            <p className="text-sm">∀z(¬Animal(z) ∨ ¬Head(x,z)))</p>
                        </div>
                    </div>

                    {/* Clausal form */}
                    <div className="flex justify-center mb-16">
                        <div className="w-1/3 bg-gray-100 border-2 border-gray-400 rounded-lg p-4 shadow-md text-center">
                            <h3 className="font-bold text-gray-800 mb-2">Clausal Form</h3>
                            <p className="text-sm text-gray-600">Convert to individual clauses</p>
                        </div>
                    </div>

                    {/* Individual clauses */}
                    <div className="flex justify-between mb-16">
                        <div className="w-1/5 bg-white border-2 border-gray-300 rounded-lg p-3 shadow-sm">
                            <h4 className="font-semibold text-xs mb-1">Clause 1</h4>
                            <p className="text-xs">¬Horse(x) ∨ Animal(x)</p>
                        </div>

                        <div className="w-1/5 bg-white border-2 border-gray-300 rounded-lg p-3 shadow-sm">
                            <h4 className="font-semibold text-xs mb-1">Clause 2a</h4>
                            <p className="text-xs">Horse(a)</p>
                        </div>

                        <div className="w-1/5 bg-white border-2 border-gray-300 rounded-lg p-3 shadow-sm">
                            <h4 className="font-semibold text-xs mb-1">Clause 2b</h4>
                            <p className="text-xs">Head(b,a)</p>
                        </div>

                        <div className="w-1/5 bg-white border-2 border-gray-300 rounded-lg p-3 shadow-sm">
                            <h4 className="font-semibold text-xs mb-1">Clause 2c</h4>
                            <p className="text-xs">¬Animal(z) ∨ ¬Head(b,z)</p>
                        </div>
                    </div>

                    {/* Resolution steps */}
                    <div className="flex justify-between mb-16">
                        <div className="w-2/5 bg-purple-100 border-2 border-purple-300 rounded-lg p-4 shadow-md">
                            <h3 className="font-bold text-purple-800 mb-2">Resolution Step 1</h3>
                            <p className="text-sm">Resolve: ¬Horse(a) ∨ Animal(a) with Horse(a)</p>
                            <p className="text-sm font-semibold text-green-700 mt-2">Result: Animal(a)</p>
                        </div>

                        <div className="w-2/5 bg-purple-100 border-2 border-purple-300 rounded-lg p-4 shadow-md">
                            <h3 className="font-bold text-purple-800 mb-2">Resolution Step 2</h3>
                            <p className="text-sm">Substitute z = a in clause 2c:</p>
                            <p className="text-sm">¬Animal(a) ∨ ¬Head(b,a)</p>
                            <p className="text-sm">with Head(b,a) and Animal(a)</p>
                        </div>
                    </div>

                    {/* Final resolution */}
                    <div className="flex justify-center mb-8">
                        <div className="w-2/3 bg-purple-100 border-2 border-purple-300 rounded-lg p-4 shadow-md text-center">
                            <h3 className="font-bold text-purple-800 mb-2">Final Resolution</h3>
                            <p className="text-sm">Animal(a) vs ¬Animal(a)</p>
                            <p className="text-sm">Head(b,a) vs ¬Head(b,a)</p>
                        </div>
                    </div>

                    {/* Contradiction */}
                    <div className="flex justify-center mb-8">
                        <div className="w-1/2 bg-red-100 border-2 border-red-400 rounded-lg p-4 shadow-md text-center">
                            <h3 className="font-bold text-red-800 mb-2">□ (Empty Clause)</h3>
                            <p className="text-lg font-bold text-red-700">CONTRADICTION!</p>
                        </div>
                    </div>

                    {/* Conclusion */}
                    <div className="flex justify-center">
                        <div className="w-3/4 bg-green-100 border-2 border-green-400 rounded-lg p-6 shadow-lg text-center">
                            <h3 className="font-bold text-green-800 mb-3 text-lg">Conclusion: Original statement is TRUE</h3>
                            <p className="text-lg font-semibold text-green-700">
                                &quot;The head of a horse is the head of an animal&quot;
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                                Proven by resolution theorem proving through contradiction
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-8 bg-white rounded-lg p-4 shadow-sm border">
                <h4 className="font-bold mb-3">Legend:</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded mr-2"></div>
                        <span>Premise</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded mr-2"></div>
                        <span>Negated Goal</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded mr-2"></div>
                        <span>Resolution</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-100 border border-red-400 rounded mr-2"></div>
                        <span>Contradiction</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-100 border border-green-400 rounded mr-2"></div>
                        <span>Proof Complete</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResolutionProofDiagram;