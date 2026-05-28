export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div className="flex items-center justify-between p-4 bg-red-600">

            <div className="flex gap-5">
                <span className="text-3xl font-semibold">
                    {title} <span>&gt;</span>
                </span>
                

                <div className="flex items-center font-medium space-x-2 mt-2">
                    {Array.isArray(breadcrumb) ? (
                        breadcrumb.map((item, index) => (
                            
                            <span key={index} className="text-gray-500">
                                {item} 
                                {index < breadcrumb.length - 1 && " / "}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-500">{breadcrumb}</span>
                    )}
                </div>
            </div>

            <div>
                {children}
            </div>

        </div>
    );
}