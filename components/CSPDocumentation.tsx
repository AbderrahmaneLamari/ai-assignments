import React from 'react';

export default function CSPAnalysisPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-blue-500">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        CSP Features Analysis: Multi-Group Timetable Scheduling
                    </h1>
                    <p className="text-lg text-gray-600">
                        Comprehensive analysis of Constraint Satisfaction Problem implementation for academic scheduling
                    </p>
                </div>

                {/* Section 1: Variables Structure */}
                <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg mr-3">1</span>
                        Variables Structure
                    </h2>

                    <p className="text-gray-700 mb-6">
                        The CSP variables represent course sessions that need to be scheduled:
                    </p>

                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Variable Format</h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <p className="font-semibold text-blue-800 mb-2">Structure: <code className="bg-blue-100 px-2 py-1 rounded">(course_type, group_id)</code> <strong>couple</strong> (2-tuple)</p>
                            <div className="text-blue-700">
                                <p className="mb-1"><strong>Examples:</strong></p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li><code className="bg-blue-100 px-2 py-1 rounded">(&quot;Sécurité_lecture&quot;, 1)</code> - Security lecture for group 1</li>
                                    <li><code className="bg-blue-100 px-2 py-1 rounded">(&quot;Réseaux 2_td&quot;, 3)</code> - Networks 2 TD session for group 3</li>
                                    <li><code className="bg-blue-100 px-2 py-1 rounded">(&quot;Artificial Intelligence_tp&quot;, 5)</code> - AI TP session for group 5</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Variable Categories</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h4 className="font-semibold text-green-800 mb-2">1. Lectures</h4>
                                <p className="text-green-700 text-sm"><code>course_lecture</code> - Shared across all groups (6 groups)</p>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h4 className="font-semibold text-yellow-800 mb-2">2. TD Sessions</h4>
                                <p className="text-yellow-700 text-sm"><code>course_td</code> - One per group (individual group sessions)</p>
                            </div>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <h4 className="font-semibold text-purple-800 mb-2">3. TP Sessions</h4>
                                <p className="text-purple-700 text-sm"><code>course_tp</code> - One per group (practical sessions)</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Variable Generation Logic</h3>
                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-green-400 text-sm">
                                {`# Lectures: One variable per course (shared by all groups)
if data.get("lecture", 0) > 0:
    variables.append((f"{course}_lecture", 1))

# TD/TP: One variable per group per course
for group_id in range(1, 7):
    if data.get("td", 0) > 0:
        variables.append((f"{course}_td", group_id))
    if data.get("tp", 0) > 0:
        variables.append((f"{course}_tp", group_id))`}
                            </pre>
                        </div>
                    </div>
                </section>

                {/* Section 2: Domains Structure */}
                <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg mr-3">2</span>
                        Domains Structure
                    </h2>

                    <p className="text-gray-700 mb-6">
                        The domain represents all possible assignments for each variable.
                    </p>

                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Domain Value Format</h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <p className="font-semibold text-green-800 mb-3">Structure: <code className="bg-green-100 px-2 py-1 rounded">(day_slot, teacher_id, group_id)</code> <strong>triplet</strong> (3-tuple)</p>
                            <div className="text-green-700">
                                <p className="mb-2"><strong>Components:</strong></p>
                                <ul className="list-disc list-inside ml-4 space-y-2">
                                    <li><code className="bg-green-100 px-2 py-1 rounded">day_slot</code>: <code className="bg-green-100 px-2 py-1 rounded">(day, slot)</code> - e.g., <code className="bg-green-100 px-2 py-1 rounded">(1, 1)</code> means Day 1, Slot 1</li>
                                    <li><code className="bg-green-100 px-2 py-1 rounded">teacher_id</code>: Integer (1-14) - Assigned teacher</li>
                                    <li><code className="bg-green-100 px-2 py-1 rounded">group_id</code>: Integer (1-6) - Target group</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Domain Constraints</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-800 mb-2">Time Slots</h4>
                                <p className="text-blue-700 text-sm mb-2">22 available slots across 5 days</p>
                                <ul className="text-blue-600 text-xs list-disc list-inside">
                                    <li>Day 1-2, 4-5: 5 slots each</li>
                                    <li>Day 3: 2 slots</li>
                                </ul>
                            </div>
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <h4 className="font-semibold text-orange-800 mb-2">Teachers</h4>
                                <p className="text-orange-700 text-sm">14 available teachers</p>
                            </div>
                            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                                <h4 className="font-semibold text-pink-800 mb-2">Groups</h4>
                                <p className="text-pink-700 text-sm">6 student groups</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Domain Filtering</h3>
                        <div className="space-y-3">
                            <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
                                <p className="text-gray-800"><strong>Group Filtering:</strong> Each variable&apos;s domain is filtered to only include values matching its group ID</p>
                            </div>
                            <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
                                <p className="text-gray-800"><strong>Teacher Constraints:</strong> Only qualified teachers can be assigned to specific courses</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Mega Domain</h3>
                        <p className="text-gray-700 mb-3">Initial universal domain before filtering:</p>
                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-green-400 text-sm">
                                {`mega_domain = [(day_slot, teacher, group) 
               for day_slot in SLOTS 
               for teacher in TEACHERS 
               for group in GROUPS]`}
                            </pre>
                        </div>
                    </div>
                </section>

                {/* Section 3: Constraints Structure */}
                <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg mr-3">3</span>
                        Constraints Structure
                    </h2>

                    <p className="text-gray-700 mb-6">
                        The CSP implements two main constraint types:
                    </p>

                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Constraint Format</h3>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="font-semibold text-red-800 mb-2">Structure: <code className="bg-red-100 px-2 py-1 rounded">(variable1, variable2, constraint_function)</code> <strong>triplet</strong> (3-tuple)</p>
                            <p className="text-red-700"><strong>Generation:</strong> All pairs of variables with each constraint function</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Constraint Functions</h3>

                        <div className="space-y-6">
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">1. Teacher Conflict Constraint (<code>teacher_same_slot_diff_group</code>)</h4>
                                <div className="mb-4 space-y-2">
                                    <p className="text-gray-700"><strong>Purpose:</strong> Prevents same teacher from teaching multiple groups simultaneously</p>
                                    <p className="text-gray-700"><strong>Logic:</strong> Returns <code className="bg-gray-100 px-2 py-1 rounded">False</code> if same teacher and same time slot</p>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-green-400 text-sm">
                                        {`def teacher_same_slot_diff_group(self, sched1, sched2):
    cren1, t1, g1 = sched1
    cren2, t2, g2 = sched2
    
    if t1 == t2 and cren1 == cren2:
        return False  # Violation
    else:
        return True   # Satisfied`}
                                    </pre>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">2. Group Conflict Constraint (<code>diffrent_lectre_same_groupe</code>)</h4>
                                <div className="mb-4 space-y-2">
                                    <p className="text-gray-700"><strong>Purpose:</strong> Prevents same group from having multiple sessions simultaneously</p>
                                    <p className="text-gray-700"><strong>Logic:</strong> Returns <code className="bg-gray-100 px-2 py-1 rounded">False</code> if same group and same time slot</p>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-green-400 text-sm">
                                        {`def diffrent_lectre_same_groupe(self, sched1, sched2):
    cren1, t1, g1 = sched1
    cren2, t2, g2 = sched2
    
    if g1 == g2 and cren1 == cren2: 
        return False  # Violation
    else: 
        return True   # Satisfied`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Constraints (in <code>is_consistent</code> method)</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-800 mb-2">3. Teacher Qualification Constraint</h4>
                                <p className="text-blue-700 text-sm mb-2"><strong>Purpose:</strong> Ensures only qualified teachers teach specific courses</p>
                                <p className="text-blue-700 text-sm"><strong>Logic:</strong> Checks if assigned teacher matches course requirements</p>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h4 className="font-semibold text-yellow-800 mb-2">4. Consecutive Hours Constraint</h4>
                                <p className="text-yellow-700 text-sm mb-2"><strong>Purpose:</strong> Limits consecutive teaching/learning hours</p>
                                <div className="text-yellow-700 text-xs">
                                    <p><strong>Logic:</strong></p>
                                    <ul className="list-disc list-inside ml-2">
                                        <li>Teachers: Max 3 consecutive hours (4+ is violation)</li>
                                        <li>Groups: Max 3 consecutive hours (4+ is violation)</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 md:col-span-2">
                                <h4 className="font-semibold text-purple-800 mb-2">5. Group Assignment Constraint</h4>
                                <p className="text-purple-700 text-sm mb-2"><strong>Purpose:</strong> Ensures variable&apos;s group matches value&apos;s group</p>
                                <p className="text-purple-700 text-sm"><strong>Logic:</strong> <code className="bg-purple-100 px-2 py-1 rounded">var[1] == value[2]</code></p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: CSP Algorithm Components */}
                <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg mr-3">4</span>
                        CSP Algorithm Components
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-purple-800 mb-4">Search Strategy</h3>
                            <ul className="space-y-2 text-purple-700">
                                <li><strong>Algorithm:</strong> Backtracking with constraint propagation</li>
                                <li><strong>Preprocessing:</strong> AC-3 algorithm for domain reduction</li>
                            </ul>
                        </div>

                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-indigo-800 mb-4">Heuristics</h3>
                            <ul className="space-y-2 text-indigo-700">
                                <li><strong>Variable Selection:</strong> MRV (Minimum Remaining Values)</li>
                                <li><strong>Value Ordering:</strong> LCV (Least Constraining Value)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Special Handling</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li><strong>Lectures:</strong> Automatically assigned to all 6 groups when one is assigned</li>
                            <li><strong>Assignments:</strong> Pre-defined lecture assignments in <code className="bg-gray-100 px-2 py-1 rounded">self.assignments</code></li>
                        </ul>
                    </div>
                </section>

                {/* Section 5: Problem Complexity */}
                <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg mr-3">5</span>
                        Problem Complexity
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Scale</h3>
                            <div className="space-y-3">
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                    <p className="text-orange-800"><strong>Variables:</strong> ~50+ variables (8 courses × multiple session types × 6 groups)</p>
                                </div>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <p className="text-red-800"><strong>Domain Size:</strong> Initially 22 × 14 × 6 = 1,848 values per variable</p>
                                </div>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                    <p className="text-yellow-800"><strong>Constraints:</strong> ~125,000+ constraint tuples (variables² × constraint_functions)</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Challenges</h3>
                            <div className="space-y-3">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <p className="text-blue-800 text-sm"><strong>Resource Conflicts:</strong> Teachers and rooms (implicit)</p>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <p className="text-green-800 text-sm"><strong>Time Conflicts:</strong> Group scheduling conflicts</p>
                                </div>
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                    <p className="text-purple-800 text-sm"><strong>Consecutive Hours:</strong> Soft constraint optimization</p>
                                </div>
                                <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                                    <p className="text-pink-800 text-sm"><strong>Teacher Specialization:</strong> Subject-specific teacher assignments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-center">
                    <p className="text-white text-lg font-medium">
                        CSP Implementation for Multi-Group Academic Timetable Scheduling
                    </p>
                    <p className="text-blue-100 text-sm mt-2">
                        Comprehensive constraint satisfaction approach with advanced heuristics and optimization
                    </p>
                </div>
            </div>
        </div>
    );
}