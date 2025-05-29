"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GroupSelectorProps {
    groups: string[]
    selectedGroup: string
    onGroupChange: (group: string) => void
}

export function GroupSelector({ groups, selectedGroup, onGroupChange }: GroupSelectorProps) {
    return (
        <div className="flex items-center gap-2 mb-6">
            <label htmlFor="group-select" className="text-sm font-medium">
                Select Group:
            </label>
            <Select value={selectedGroup} onValueChange={onGroupChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                    {groups.map((group) => (
                        <SelectItem key={group} value={group}>
                            Group {group}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
