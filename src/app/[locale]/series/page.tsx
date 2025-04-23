import React from 'react';

type Props = {
    params: Promise<{ locale: string }>
}

const Series = async ({ params } : Props) => {

    const { locale } = await params;

    return (
        <div>
            <h1>Series - {locale}</h1>
        </div>
    )
}

export default Series;