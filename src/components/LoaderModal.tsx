import Typed from 'react-typed'

interface LoaderModalProps {
    complete?: boolean
    tx: string
}

export default function LoaderModal({ complete, tx = '0xbd7af71cfd7e663f6a306845a72fc05baff982f4cee10c6589a4829524ecb231' }: LoaderModalProps) {
    return (
        <div className="fixed z-50 bottom-6 right-6 max-w-xs w-full bg-animated-rainbow rounded-2xl shadow-2xl p-1">
            <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center space-x-4">
                    <div className="space-y-1 overflow-hidden">
                        <p className="font-extrabold text-xl truncate">
                            {complete ? (
                                'Complete.'
                            ) : (
                                <>
                                    <Typed strings={['Transacting...']} typeSpeed={40} loop />
                                </>
                            )}
                        </p>
                        <p className="text-xs font-mono truncate opacity-50">TX: {tx}</p>
                    </div>
                    {!complete && (
                        <div>
                            <div className="bg-rainbow h-4 w-6 rounded-full shadow-xl animate-spin" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
