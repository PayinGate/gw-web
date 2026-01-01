export default function AccountSettings() {
    return <>
    <div data-state="active" dataOrientation="horizontal" role="tabpanel" aria-labelledby="radix-_r_2c_-trigger-profile" id="radix-_r_2c_-content-profile" tabindex="0" className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group-data-[orientation=vertical]/tabs:mt-0 mt-0">
    <div className="rounded-lg border   shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-lg font-semibold leading-none tracking-tight">Personal Information</h3>
            <p className="text-sm text-muted-foreground">Update your personal details.</p>
            </div>
            <div className="p-6 pt-0 grid gap-6">
                <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="name">Full Name</label>
                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" id="name" placeholder="Admin User" />
                </div>
                <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">Email Address</label>
                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" id="email" type="email" value="admin@example.com" />
                </div>
            </div>
            <div className="flex items-center p-6 pt-0">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#25b19c]  text-[#f7fdfc]  hover:bg-primary/90 h-10 px-4 py-2">Save Profile</button>
            </div>
        </div>
    </div>
    </>
}