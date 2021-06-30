import { Progress } from '@geist-ui/react'

interface TokenPercentageBarProps {
    src: String
    name: String
    value: Number
    percentage: String
}

export default function TokenPercentageBar({ src, name, value, percentage }: TokenPercentageBarProps) {
    return (
        <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-gray-100 rounded-full" />
            <p className="text-xs font-bold">{name}</p>
            <Progress className="flex-1" type="secondary" value={value} />
            <p className="text-xs font-medium">{value}%</p>
        </div>
    )
}
