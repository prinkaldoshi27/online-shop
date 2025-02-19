import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Skeleton } from 'primereact/skeleton';
import { classNames } from 'primereact/utils';

export default function Loader() {
    const [layout, setLayout] = useState('grid');

    const skeletonData = new Array(6).fill({ id: null });

    const listItem = () => (
        <div className="col-12">
            <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4')}
                style={{ marginTop: '1rem', border: '1px solid lightgrey', borderRadius: '8px' }}>
                <Skeleton className="w-9 sm:w-16rem xl:w-10rem shadow-2 h-6rem block xl:block mx-auto" />
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <Skeleton className="w-8rem  h-2rem" />
                        <Skeleton className="w-6rem  h-1rem" />
                        <Skeleton className="w-6rem  h-1rem" />
                    </div>
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <Skeleton className="w-4rem  h-2rem" />
                        <Skeleton shape="circle" className="w-3rem h-3rem" />
                    </div>
                </div>
            </div>
        </div>
    );

    const gridItem = () => (
        <div className="col-12 sm:col-6 lg:col-4 p-2">
            <div className="p-4 surface-card"
                style={{ marginTop: '1rem', border: '1px solid lightgrey', borderRadius: '8px' }}>
                <Skeleton className="w-6rem  h-1rem" />
                <Skeleton className="w-3rem  h-1rem" />
                <div className="flex flex-column align-items-center gap-3 py-5">
                    <Skeleton className="w-9 shadow-2 h-10rem" />
                    <Skeleton className="w-8rem  h-2rem" />
                    <Skeleton className="w-6rem  h-1rem" />
                </div>
                <div className="flex align-items-center justify-content-between">
                    <Skeleton className="w-4rem  h-2rem" />
                    <Skeleton shape="circle" className="w-3rem h-3rem" />
                </div>
            </div>
        </div>
    );

    const itemTemplate = (product, layout) => {
        return layout === 'list' ? listItem() : gridItem();
    };

    return (
        <div className="card">
            <DataView value={skeletonData} itemTemplate={(product, layout) => itemTemplate(product, layout)}
                layout={layout} header={<DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />}
            />
        </div>
    );
}
