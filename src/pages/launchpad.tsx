export default function LaunchPad() {
    return (
        <div className="min-h-full flex items-center justify-center bg-pink-100">
            <div className="max-w-2xl w-full space-y-6 px-6 py-12 md:p-0">
                <div className="flex items-center">
                    <div className="space-y-1 flex-1">
                        <p className="text-xs font-medium text-pink-300">Launch an App</p>
                        <h1 className="text-2xl font-bold flex-1">Launchpad</h1>
                    </div>

                    <div>
                        <img className="w-12 animate-spin" src="/img/scream-multi.png" alt="" />
                    </div>
                </div>
                <div>
                    <a href="# " className="block bg-white rounded-xl shadow-xl hover:shadow transition ease-in-out duration-300 p-6 space-y-2">
                        <p className="text-4xl font-extrabold">Lending</p>
                        <p className="text-xl">Occaecat ea ad ut Lorem proident consectetur ea sit ullamco. Dolor nisi pariatur dolore culpa.</p>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <a href="# " className="block bg-white rounded-xl shadow-xl hover:shadow transition ease-in-out duration-300 p-6 space-y-2">
                        <p className="text-4xl font-extrabold">Launchpool</p>
                        <p className="text-xl">Proident labore tempor exercitation exercitation ut laborum non ut.</p>
                    </a>

                    <a href="# " className="block bg-white rounded-xl shadow-xl hover:shadow transition ease-in-out duration-300 p-6 space-y-2">
                        <p className="text-4xl font-extrabold">Farming</p>
                        <p className="text-xl">Tempor laborum id laborum pariatur adipisicing.</p>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a href="# " className="md:col-span-1 block bg-white rounded-xl shadow-xl hover:shadow transition ease-in-out duration-300 p-6 space-y-2">
                        <p className="text-4xl font-extrabold">Events</p>
                        <p className="text-xl">Non labore Lorem esse laboris tempor id.</p>
                    </a>

                    <a href="# " className="md:col-span-2 block bg-white rounded-xl shadow-xl hover:shadow transition ease-in-out duration-150 p-6 space-y-2">
                        <p className="text-4xl font-extrabold">Launchpool</p>
                        <p className="text-xl">Duis velit nulla cillum sit magna velit fugiat.</p>
                    </a>
                </div>

                <div>
                    <a href="# " className="block bg-white rounded-xl shadow-xl hover:shadow transition ease-in-out duration-150 p-6 space-y-2">
                        <p className="text-4xl font-extrabold">Scream the Game</p>
                        <p className="text-xl">Pariatur elit ut laborum sunt.</p>
                    </a>
                </div>
            </div>
        </div>
    )
}
