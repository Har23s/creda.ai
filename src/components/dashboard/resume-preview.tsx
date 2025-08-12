import { type ResumeValues } from '@/app/dashboard/resume-builder/client';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function ResumePreview(props: ResumeValues) {
    const {
        fullName,
        email,
        phone,
        linkedin,
        website,
        summary,
        experience,
        education,
        projects,
        certificates,
        skills,
    } = props;
    
    return (
        <div className="bg-white text-black rounded-lg shadow-lg p-8 w-full h-full overflow-y-auto font-body text-sm origin-top-left scale-[0.375] sm:scale-100 md:scale-[0.375] lg:scale-100">
            <header className="text-center mb-6">
                <h1 className="font-headline text-3xl font-bold tracking-tight">{fullName}</h1>
                <div className="flex justify-center items-center gap-4 mt-2 text-xs">
                    {email && <p>{email}</p>}
                    {phone && <p>{phone}</p>}
                </div>
                 <div className="flex justify-center items-center gap-4 mt-1 text-xs text-blue-600">
                    {linkedin && <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                    {website && <a href={website} target="_blank" rel="noreferrer">Website</a>}
                </div>
            </header>

            <section>
                <h2 className="font-headline text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-3">Summary</h2>
                <p className="text-gray-700">{summary}</p>
            </section>
            
            <section className="mt-6">
                 <h2 className="font-headline text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-3">Experience</h2>
                 <div className="space-y-4">
                    {experience.map((exp, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-base">{exp.title}</h3>
                                <p className="text-xs text-gray-600">{exp.dates}</p>
                            </div>
                            <p className="italic text-gray-800">{exp.company}</p>
                            <div className="prose prose-sm mt-1 text-gray-700 whitespace-pre-wrap">
                                {exp.description}
                            </div>
                        </div>
                    ))}
                 </div>
            </section>
            
            {projects && projects.length > 0 && (
              <section className="mt-6">
                  <h2 className="font-headline text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-3">Projects</h2>
                  <div className="space-y-4">
                      {projects.map((proj, index) => (
                          <div key={index}>
                              <div className="flex justify-between items-baseline">
                                  <h3 className="font-bold text-base">{proj.name}</h3>
                                  {proj.url && <a href={proj.url} className="text-xs text-blue-600" target="_blank" rel="noreferrer">Link</a>}
                              </div>
                              <div className="prose prose-sm mt-1 text-gray-700 whitespace-pre-wrap">
                                  {proj.description}
                              </div>
                          </div>
                      ))}
                  </div>
              </section>
            )}

            <section className="mt-6">
                 <h2 className="font-headline text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-3">Education</h2>
                 <div className="space-y-3">
                    {education.map((edu, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-base">{edu.degree}</h3>
                                <p className="text-xs text-gray-600">{edu.dates}</p>
                            </div>
                            <p className="italic text-gray-800">{edu.school}</p>
                        </div>
                    ))}
                 </div>
            </section>
            
            {certificates && certificates.length > 0 && (
                <section className="mt-6">
                    <h2 className="font-headline text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-3">Certificates</h2>
                    <div className="space-y-3">
                        {certificates.map((cert, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-base">{cert.name}</h3>
                                    <p className="text-xs text-gray-600">{cert.date}</p>
                                </div>
                                <p className="italic text-gray-800">{cert.issuer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            
            <section className="mt-6">
                 <h2 className="font-headline text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.split(',').map((skill, index) => (
                        skill.trim() && <Badge key={index} variant="secondary" className="bg-gray-200 text-gray-800">{skill.trim()}</Badge>
                    ))}
                </div>
            </section>
        </div>
    )
}
